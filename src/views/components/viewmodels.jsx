import m from 'mithril'
let {prop} = m

var uuid = require('node-uuid')

// export NavbarVM = {
// 	selectedTab: prop(0)
// }

export let Model = {
	Characters	: prop([]),
	Currency	: { Name: prop(""), Acronym: prop(""), Prefix: prop("") },

	newCharacter( id = null, keys = prop([]), values = prop([]), kvtypes = prop([]), progression = defaultProgression ) {
		
		if(!id)
			id = prop(uuid.v1())

		let char = {}

		char.ID = id
		char.Keys = keys
		char.Values = values
		char.KVTypes = kvtypes
		char.Progression = progression 	// Check to see if this is a function?

		return char
		
	}
}

let defaultProgression = {
	Damage		: prop([0]),
	Cost		: prop([0])
}
