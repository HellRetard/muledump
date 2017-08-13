function stackCount(id){
	// Old tokens are yet to be added
	// Moss, Stone, Mad God Tokens
	if(id >= 0x99f && id <= 0x9a8) return id - 0x99f + 1;
	else if(id >= 0x9a9 && id <= 0x9b2) return id - 0x9a9 + 1;
	else if(id >= 0x9b3 && id <= 0x9bd) return id - 0x9b3 + 1;

	// Sand Pails
	else if(id >= 0xc34 && id < 0xc38) return 0xc38 - id + 1;

	// Elixirs
	else{
		switch(id){
			case 0xb18: return 7; break;
			case 0xb19: return 6; break;
			case 0xb1a: return 5; break;
			case 0xb1b: return 4; break;
			case 0xa4a: return 3; break;
			case 0xaed: return 2; break;
			case 0xaee: return 1; break;

			case 0xb14: return 7; break;
			case 0xb15: return 6; break;
			case 0xb16: return 5; break;
			case 0xb17: return 4; break;
			case 0xa81: return 3; break;
			case 0xa48: return 2; break;
			case 0xa49: return 1; break;
		}
	}
}
