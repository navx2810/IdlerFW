import m from 'mithril'
let { prop } = m
import {Navbar, CharacterListings, Curves, Options} from './components'


m.route.mode = "hash"

m.route(document.querySelector("#app"), "characters", {
	"characters": CharacterListings,
	"curves": Curves,
	"options": Options
})

m.mount(document.querySelector("#navbar"), Navbar)