var pcstatnames = {
  0: 'Shots',
  1: 'Shots That Damage',
  2: 'Special Ability Uses',
  3: 'Tiles Uncovered',
  4: 'Teleports',
  5: 'Potions Drunk',
  6: 'Monster Kills',
  7: 'Monster Assists',
  8: 'God Kills',
  9: 'God Assists',
  10: 'Cube Kills',
  11: 'Oryx Kills',
  12: 'Quests Completed',
  19: 'LevelUp Assists',
  20: 'Minutes Active',
}

var dungeonnames = {
  13: 'Pirate Caves',
  14: 'Undead Lairs',
  15: 'Abysses',
  16: 'Snake Pits',
  17: 'Spider Dens',
  18: 'Sprite Worlds',
  21: 'Tombs',
  22: 'Trenches',
  23: 'Jungles',
  24: 'Manors',
  25: 'Forest Mazes',
  28: 'Cemeteries',
  30: 'Mad Labs',
  31: 'Davys',
  34: 'Ice Caves',
  35: 'Deadwater Docks',
  36: 'Crawling Depths',
  37: 'Woodland Labyrinths',
  39: 'Shatters',
  41: 'Puppets',
  42: 'Sewers',
  43: 'Hives',
  45: 'Nests',
  46: 'LODs',
  47: 'Lost Halls',
  48: 'Cultist Hideouts',
  49: 'Voids',
}

var shortdungeonnames = { // sorted by "tier"
  13: 'Pirate',
  23: 'Jungle',
  17: 'Spider',
  16: 'Snake',
  18: 'Sprite',
  24: 'Manor',
  14: 'UDL',
  15: 'Abyss',
  22: 'Trench',
  21: 'Tomb',
}

var bonuses = {
  'Ancestor': function(s, c) {
    return (c.id < 2) ? {mul: 0.1, add: 20} : 0;
  },
  'Legacy Builder': function(s, c, d) {
    // 0.1
  },
  'Pacifist': function(s) {
    return s[1] ? 0 : 0.25;
  },
  'Thirsty': function(s) {
    return s[5] ? 0 : 0.25;
  },
  'Mundane': function(s) {
    return s[2] ? 0 : 0.25;
  },
  'Boots on the Ground': function(s) {
    return s[4] ? 0 : 0.25;
  },
  'Tunnel Rat': function(s) {
    for (var i in shortdungeonnames) if (!s[i]) return 0;
    return 0.1;
  },
  'Enemy of the Gods': function(s) {
    return (s[8] / (s[6] + s[8]) > 0.1) ? 0.1 : 0;
  },
  'Slayer of the Gods': function(s) {
    return (s[8] / (s[6] + s[8]) > 0.5) ? 0.1 : 0;
  },
  'Oryx Slayer': function(s) {
    return s[11] ? 0.1 : 0;
  },
  'Accurate': function(s) {
    return (s[1] / s[0] > 0.25) ? 0.1 : 0;
  },
  'Sharpshooter': function(s) {
    return (s[1] / s[0] > 0.5) ? 0.1 : 0;
  },
  'Sniper': function(s) {
    return (s[1] / s[0] > 0.75) ? 0.1 : 0;
  },
  'Explorer': function(s) {
    return (s[3] > 1e6) ? 0.05 : 0;
  },
  'Cartographer': function(s) {
    return (s[3] > 4e6) ? 0.05 : 0;
  },
  'Team Player': function(s) {
    return (s[19] > 100) ? 0.1 : 0;
  },
  'Leader of Men': function(s) {
    return (s[19] > 1000) ? 0.1 : 0;
  },
  'Doer of Deeds': function(s) {
    return (s[12] > 1000) ? 0.1 : 0;
  },
  'Friend of the Cubes': function(s) {
    return s[10] ? 0 : 0.1;
  },
  'Well Equipped': function(s, c) {
    var eq = c.Equipment.split(',');
    var b = 0;
    for (var i = 0; i < 4; i++) {
      var it = items[+eq[i]] || items[-1];
      b += it[5];
    }
    return b * 0.01;
  },
  'First Born': function(s, c, d, f) {
    return (d.Account.Stats.BestCharFame < f) ? 0.1: 0;
  },
}

var goals = {
  'Tunnel Rat': function(s) {
    var r = [];
    for (var i in shortdungeonnames) {
      if (!s[i]) r.push(shortdungeonnames[i]);
    }
    return [r.join(', '), 'dungeons'];
  },
  'Enemy of the Gods': function(s) {
    var x = s[6] / 9 - s[8];
    if (Math.ceil(x) == x) x += 1;
    return [Math.ceil(x), 'god kills'];
  },
  'Slayer of the Gods': function(s) {
    return [s[6] - s[8] + 1, 'god kills'];
  },
  'Oryx Slayer': function(s) {
    return s[11] ? 0 : [1, 'Oryx kill'];
  },
  'Accurate': function(s) {
    var x = (0.25 * s[0] - s[1]) / 0.75;
    if (Math.ceil(x) == x) x += 1;
    return [Math.ceil(x), 'shots'];
  },
  'Sharpshooter': function(s) {
    var x = (0.5 * s[0] - s[1]) / 0.5;
    if (Math.ceil(x) == x) x += 1;
    return [Math.ceil(x), 'shots'];
  },
  'Sniper': function(s) {
    var x = (0.75 * s[0] - s[1]) / 0.25;
    if (Math.ceil(x) == x) x += 1;
    return [Math.ceil(x), 'shots'];
  },
  'Explorer': function(s) {
    return [1e6 - s[3] + 1, 'tiles'];
  },
  'Cartographer': function(s) {
    return [4e6 - s[3] + 1, 'tiles'];
  },
  'Team Player': function(s) {
    return [100 - s[19] + 1, 'party levelups'];
  },
  'Leader of Men': function(s) {
    return [1000 - s[19] + 1, 'party levelups'];
  },
  'Doer of Deeds': function(s) {
    return [1000 - s[12] + 1, 'quests'];
  },
}


function readstats(pcstats) {
  function readInt32BE(str, idx) {
    var r = 0;
    for (var i = 0; i < 4; i++) {
      var t = str.charCodeAt(idx + 3 - i);
      r += t << (8 * i);
    }
    return r;
  }

  pcstats = pcstats || ''
  var b = atob(pcstats.replace(/-/g, '+').replace(/_/g, '/'));
  var r = [];
  for (var i = 0; i < b.length; i += 5) {
    var f = b.charCodeAt(i);
    var val = readInt32BE(b, i + 1);
    r[f] = val;
  }
  for (var i in pcstatnames) if (!r[i]) r[i] = 0;
  return r;
}

function printstats(c, d, dogoals, dostats) {
  var st = readstats(c.PCStats);
  var $c = $('<div class="pcstats" />');
  var fame = +c.CurrentFame;
  
  function tline(name, val, cl, $where) {
    $('<div>')
      .append($('<span>').text(name))
      .append($('<span style="float: right;">').addClass(cl || 'pcstat').text(val))
      .appendTo($where);
  }
  function gline(t, b, $where) {
    $('<div>')
      .append($('<div>').addClass('goal')
        .append($('<span>').text(t))
        .append($('<span class="bonus">').text(b))).appendTo($where);
  }
  $t = $('<div>');
  if (dogoals) {
    for (var a in goals) {
      var x = goals[a](st);
      if (!x || x[0] <= 0) continue; // finished achievements
      var achievement = x[0];
      gline(a + ': ', achievement, $t);
    }
  }
  $t.appendTo($c);
  if (!dostats) return $c;
  // DUNGEONS
  var $t = $('<div class="dungeons">');
  for (var i in dungeonnames) {
    var sname = dungeonnames[i] || '#' + i;
    if (!st[i]) tline(sname, 0, 'no-dungeon', $t);
    else tline(sname, st[i], 'dungeon', $t);
  }
  $t.append('</div>').appendTo($c);

  // OTHER STATS
  $t = $('<div>');
  for (var i in pcstatnames) {
    // if (!st[i]) continue;
    var sname = pcstatnames[i] || '#' + i;
    tline(sname, st[i], '', $t);
  }
  $t.append('</div>').appendTo($c);

  // THE REST
  $t = $('<div>');
  if (st[20] > 59) {
    var v = st[20], r = []
    var divs = { 'd': 24 * 60, 'h': 60, 'm': 1 }
    for (var s in divs) {
      if (r.length > 2) break;
      var t = Math.floor(v / divs[s]);
      if (t) r.push(t + s);
      v %= divs[s];
    }
    tline('Active', r.join(' '), 'info', $t);
  }
  if (st[0] && st[1]) {
    //tline('Accuracy', Math.round(10000 * st[1] / st[0]) / 100 + '%', '', $t);
    var n = Math.round(10000 * st[1] / st[0]) / 100;
    var clr = Math.min(n);
    var color = [
      (255 * (1-(clr/100))).toFixed(0),
      (255 * (clr/100)).toFixed(0),
      0];
    $('<div>')
      .append($('<span>').text('Accuracy'))
      .append($('<span style="float: right; color: rgb('+color[0]+','+color[1]+','+color[2]+');">').text(n + '%'))
      .appendTo($t);
  }
  if (st[8]) {
    //tline('God kill ratio', Math.round(10000 * st[8] / (st[6] + st[8])) / 100 + '%', '', $t);
    var n = Math.round(10000 * st[8] / (st[6] + st[8])) / 100;
    var clr = Math.min(n);
    var color = [
      (255 * (1-(clr/100))).toFixed(0),
      (255 * (clr/100)).toFixed(0),
      0];
    $('<div>')
      .append($('<span>').text('God kill ratio'))
      .append($('<span style="float: right; color: rgb('+color[0]+','+color[1]+','+color[2]+');">').text(n + '%'))
      .appendTo($t);
  }
  
  if (!fame) return $c;
  for (var k in bonuses) {
    var b = bonuses[k](st, c, d, fame);
    if (!b) continue;
    var incr = 0;
    if (typeof b == 'object') {
      incr += b.add;
      b = b.mul;
    }
    incr += Math.floor(fame * b);
    fame += incr;
    tline(k, '+' + incr, 'bonus', $t);
  }
  tline('Total Fame', fame, 'bonus', $t);
  
  $t.appendTo($c);

  return $c;
}
