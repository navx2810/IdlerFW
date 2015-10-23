import m from 'mithril'
let {prop} = m

let Attributes = {
	controller(props) {
		let $ = this

		// Comes as an Object { Keys : prop, Values : prop, KVTypes : prop }
		$.attributes = props.attributes
		$.editingIndex = prop(null)
		$.shown = prop(false)

		$.newAttribute = prop({})

		$.toggleShown = () => $.shown( !$.shown() )
		$.add = () => {
			let {Keys, Values, KVTypes} = $.attributes
			Keys().push("")
			Values().push("")
			KVTypes().push("")
		}
	},

	view(ctrl, props, ...children) {
		let {shown, editingIndex, attributes} = ctrl
		let {Keys, Values, KVTypes} = attributes

		let addButton = ( shown() ) ? <a onclick={ctrl.add}>Add</a> : null
		let rows = [<div><div onclick={ctrl.toggleShown}>Attributes</div> {addButton} </div>]

		if (shown())
			for (var x = 0; x < Keys().length; x++)
				if(Keys()[x].strip === "" || !Keys()[x].strip)
					rows.push( <AttributeRow attributes={attributes} index={x} /> )
				else
					rows.push( <li /*className="flex-row"*/> <span>{Keys()[x]}</span> <span>{Values()[x]}</span> : <span>{KVTypes()[x]}</span> </li> )

		// console.log(editingIndex())
		// if (editingIndex())
		// 	console.log(`Editing Cell: ${editingIndex()}`)
		// 	// rows[$.editingCell()] = ( <li className="flex-row"> <input type="text" placeholder="Key" /> <input type="text" placeholder="Value" /> : <input type="text" placeholder="Type" /> </li> )



		return <div className="Attributes"><ul>{rows}</ul></div>
	}
}

let AttributeRow = {
	controller(props) {
		let $ = this
		
		$.attributes = props.attributes
		$.index = props.index
		$.editing = prop( ($.attributes.Keys()[$.index].strip) ? false : true )

		$.key = ""
		$.value = ""
		$.type = ""
		$.alert = null

		$.onChange = (e) => {
			let {value, attributes} = e.target
			let attribute = attributes.attribute.value

			if( attribute === "Key" && value.trim() ) 	$.key = value
			if( attribute === "Value" && value.trim() ) $.value = value
			if( attribute === "Type" && value.trim() ) 	$.type = value
		}

		$.checkForSubmit = (e) => {
			if(e.keyCode == 13)
				$.save()
		}

		$.save = () => {
			let {Keys, Values, KVTypes} = $.attributes
			let {key, value, type, index} = $

			if(!key.trim() || !value.trim() || !type.trim()) {
				$.alert = "No field can be left blank!"
				return
			} else
				$.alert = null

			if( Keys()[index] !== key ) Keys()[$.index] = key
			if( Values()[index] !== value ) Values()[$.index] = value
			if( KVTypes()[index] !== type ) KVTypes()[$.index] = type

			$.editing(false)
		}

		$.editField = (e) => $.editing(true)
	},

	view(ctrl, props, ...children) {
		let {Keys, Values, KVTypes} = ctrl.attributes
		let {editing, index, alert} = ctrl
		let alertSpan = (alert !== null && alert.trim() !== "") ? <span className="alert">{alert}</span> : null

		if(editing())
			return <li className="AttributeRow Editing"> 
			<span>Key</span><input type="text" 	placeholder={(Keys()[index]) ? Keys()[index] : "Key"} attribute="Key" onchange={ctrl.onChange} onkeyup={ctrl.checkForSubmit} autofocus />
			<span>Value</span><input type="text" placeholder={(Values()[index]) ? Values()[index] : "Value"} attribute="Value" onchange={ctrl.onChange} onkeyup={ctrl.checkForSubmit} />
			<span>Type</span><input type="text" placeholder={(KVTypes()[index]) ? KVTypes()[index] : "Type"} attribute="Type" onchange={ctrl.onChange} onkeyup={ctrl.checkForSubmit} />
			<a onclick={ctrl.save}>press enter / click here to save</a> 
			{alertSpan}
		</li>
		else
			return <li className="AttributeRow" onclick={ctrl.editField}> <span attribute="Key">{Keys()[index]}</span> <span attribute="Value">{Values()[index]}</span> : <span attribute="Type">{KVTypes()[index]}</span> <a onclick={ctrl.editField}>edit</a> </li>
	}
}

export default Attributes