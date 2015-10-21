import m from 'mithril'
let {prop} = m

export NavbarVM = {
	selectedTab: prop(0)
}

export Model = {
	Characters: prop([])
}