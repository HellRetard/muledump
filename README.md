## Synopsis

This tool allows you to list contents of all your accounts in a single page (characters, their stats and items, items in vaults). Also it generates a summary of all the items

## Difference between atomizer's muledump

* New
	- number 

## Download

All released versions are [here](https://github.com/HellRetard/muledump/releases).

## Howto

- unpack
- edit **`accounts_sample.js`**
- rename it to **`accounts.js`**
- open **`muledump.html`**

## Not so obvious features

- click on item to filter accounts that hold it
- _click on account name for individual options menu_ **does not work anymore**
- mouse over over account name for total left to max potions
- _ctrl-click account name to temporarily hide it from totals_ **does not work anymore**
- **as for `accounts.js` it's completely renewed**
	- removed row length, but added ordervault
	- ordervault=1 simply orders your vault like in realm, but for big vaults it might be uncomfortable to look at
	- ordervault=0 to disable vault order
- mouse over fame to display more info

## Upcomming features

- remove trading and prices from muledump completely
- 