import m from 'mithril'
let { prop } = m
import {Navbar, CharacterListings, Curves} from './components'


m.route.mode = "hash"

m.route(document.querySelector("#app"), "characters", {
	"characters": CharacterListings,
	"curves": Curves
})

m.mount(document.querySelector("#navbar"), Navbar)