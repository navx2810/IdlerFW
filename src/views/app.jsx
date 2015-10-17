import m from 'mithril'
let { prop } = m
import {Navbar, CharacterListings} from './components'

class App {
	controller() {
		this.name = prop("Name?")
		this.onClick = (e) => m.route('b')
	}

	view(ctrl) {
		return <div>
		<h1 onclick={ctrl.onClick}>Hello, {ctrl.name()}. I am where the curves would go?</h1>
		</div>
	}
}

let app = new App()

m.route.mode = "hash"

m.route(document.querySelector("#app"), "characters", {
	"characters": CharacterListings,
	"curves": app
})

m.mount(document.querySelector("#navbar"), Navbar)