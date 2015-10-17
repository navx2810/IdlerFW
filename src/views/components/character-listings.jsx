import m from 'mithril'
let {prop} = m

let Listing = {
	controller(props) {
		this.character = props.character
		this.editing = prop(false)

		this.onClick = (e) => this.editing(true)
	},

	view(ctrl, props, ...children) {
		if (ctrl.editing())
			return <Editing character={ctrl.character} editingValue={ctrl.editing} />
		return <li className="Listing" ondblclick={ctrl.onClick}>{ctrl.character.name()}</li>
	}
}

let Editing = {
	controller(props) {
		this.character = props.character
		this.editingValue = props.editingValue

		this.isEditingName = prop(false)

		this.onDblClickName = (e) => this.isEditingName(true)

		this.hide = (e) => this.editingValue(false)
		this.toCurves = (e) => m.route('curves?id=0')
		this.onBlur = (e) => {
			let {value} = e.target

			value = value.trim()

			let valueIsNotBlank = (value !== "" && value)
			console.log(`is the value blank?: ${valueIsNotBlank}, value entered: ${e.target.value}`)

			if(value !== "" && value) {
				this.character.name(value)
				this.isEditingName(false)

			}
		}
	},

	view(ctrl, props, ...children) {
		let {name} = ctrl.character

		let NameOrInput = (ctrl.isEditingName()) ? <input type="text" placeholder={name()} onblur={ctrl.onBlur}/> : <em ondblclick={ctrl.onDblClickName}>{name()}</em>

		let IDRow = <div className="row">ID: {NameOrInput}</div>
		let AttributesRow = <div className="row">Attributes</div>
		let ButtonRow = <div className="row">
		<button className="u-pull-right" onclick={ctrl.hide}>X</button>
		<button className="u-pull-right" onclick={ctrl.toCurves}>Goto Curves</button>
		</div>

		let rows = [IDRow, AttributesRow, ButtonRow]

		return <div className="Editing">{rows}</div>
	}
}

class CharacterListings {
	controller(props) {
		this.list = m.prop([{name: prop('matt')}, {name: prop('mike')}, {name: prop('nikita')}]);
	}

	view(ctrl, props, ...children) {
		let rows = ctrl.list().map( (val, key) => <Listing key={key} character={val} /> )

		return <div className="CharacterListings">
		<div className="row ButtonBar"><button className="u-pull-right">Add</button></div>
		<ul>{rows}</ul>
		</div>
	}
}

export default new CharacterListings()