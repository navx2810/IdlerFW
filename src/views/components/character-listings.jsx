import m from 'mithril'
import {Model, Attributes} from '.'

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
		return <li className="Listing" onclick={ctrl.onClick}>{ctrl.character.ID()}</li>
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

			if(value !== "" && value) {
				this.character.ID(value)
				this.isEditingName(false)

			}
		}
	},

	view(ctrl, props, ...children) {
		let {ID} = ctrl.character

		let NameOrInput = (ctrl.isEditingName()) ? <input type="text" placeholder={ID()} onblur={ctrl.onBlur}/> : <em ondblclick={ctrl.onDblClickName}>{ID()}</em>
		let InputButtons = (ctrl.isEditingName()) ? <span><a>save</a> <a>cancel</a></span> : null

		let IDRow = <div className="row">ID: {NameOrInput} {InputButtons}</div>
		let AttributesRow = <Attributes attributes={{ Keys: ctrl.character.Keys, Values: ctrl.character.Values, KVTypes: ctrl.character.KVTypes }}/>
		let ButtonRow = <div className="row">
			<button className="u-pull-right" onclick={ctrl.hide}>X</button>
			<button className="u-pull-right" onclick={ctrl.toCurves}>Goto Curves</button>
		</div>

		let rows = [IDRow, AttributesRow,<div className="row info">content that is <em>italized</em> can be edited by clicking it</div>, ButtonRow]

		return <div className="Editing">{rows}</div>
	}
}

let CharacterCreator = {
	controller(props) {
		this.isAdding = prop(false)
		this.nameInput = ""

		this.changeAdding = (e) => this.isAdding(true)
		this.finishAdding = (e) => this.isAdding(false)
		this.onChange = (e) => this.nameInput = e.target.value
		this.saveChar = (e) => {
			let char = Model.newCharacter()
			let name = this.nameInput.trim()

			if(name !== "" && name)
				char.ID(this.nameInput)

			Model.Characters().push(char)
			this.finishAdding()
		}

		this.checkSubmit = (e) => { if(e.keyCode === 13) this.saveChar() }
	},

	view(ctrl, props, ...children) {
		let row

		if(!ctrl.isAdding())
			row = <a className="btn-green" onclick={ctrl.changeAdding} title="Add a new listing"><i className="fa fa-plus-square"></i></a>
		else
			row = <div className="CharacterCreator">
				<input type="text" placeholder="Character Name or ID" onchange={ctrl.onChange} onkeyup={ctrl.checkSubmit}/>
				<a className="btn-save" onclick={ctrl.saveChar} >save</a>
				<a className="btn-cancel" onclick={ctrl.finishAdding}>cancel</a>
			</div>

		return row
	}
}

class CharacterListings {
	controller(props) {
		this.list = Model.Characters
	}

	view(ctrl, props, ...children) {
		let rows = ctrl.list().map( (val, key) => <Listing key={key} character={val} /> )

		return <div className="CharacterListings">
		<div className="row header">
		<div className="row">
			<h2 className="ListingsHeader">Characters</h2>
		</div>
		<div className="row"><CharacterCreator /></div>
		</div>
		<ul>{rows}</ul>
		</div>
	}
}

export default new CharacterListings()