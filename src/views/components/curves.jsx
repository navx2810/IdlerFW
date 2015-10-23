import m from 'mithril'
let {prop, route} = m
import {Model} from '.'

let CharacterChooser = {
	view(ctrl, props, ...children) {
		let {data} = props
		let rows = data().map( (v, k) => <option value={k}>{v.ID()}</option> )

		rows.unshift(<option disabled selected>select a character</option>)

		return <select onchange={props.changeHandle} name="characterSelector" className="CharacterChooser">
			{rows}
		</select>
	}
}

let CurvesTable = {
	controller(props) {
		this.character = props.character

		this.damagePercentage = prop(false)
		this.costPercentage = prop(false)

		this.changeDamage = (e) => {
			let index = e.target.attributes.index.value
			let {value} = e.target
			this.character.Progression.Damage()[index] = value
			e.target.value = ""
		}

		this.changeCost = (e) => {
			let index = e.target.attributes.index.value
			let {value} = e.target
			this.character.Progression.Cost()[index] = value
			e.target.value = ""
		}

		this.addNewColumn = (e) => {
			let {Damage, Cost} = this.character.Progression
			Damage().push(0)
			Cost().push(0)
		}

		this.deleteAll = (e) => {
			let {Damage, Cost} = this.character.Progression

			Damage().splice(1, Damage().length)
			Cost().splice(1, Cost().length)
		}

		this.deleteColm = (e) => {
			let {Damage, Cost} = this.character.Progression
			let index = e.target.attributes.index.value
		}

		this.toggleCostPercentage = (e) => this.costPercentage( e.target.checked )
		this.toggleDamagePercentage = (e) => this.damagePercentage( e.target.checked )
	}, 

	view(ctrl, props, ...children) {
		let levelRow = props.character.Progression.Damage().map( (v, k) => <th>Lv {k}</th> )
		levelRow.unshift(<th><a className="btn-green" onclick={ctrl.addNewColumn}><i className="fa fa-plus"/></a></th>)

		let damageRow = props.character.Progression.Damage().map( (v, k) => <td><input type="text" index={k} onchange={ctrl.changeDamage} placeholder={v}/></td> )
		damageRow.unshift(<th>Damage</th>)

		let costRow = props.character.Progression.Cost().map( (v, k) => <td><input type="text" index={k} onchange={ctrl.changeCost} placeholder={v}/></td>)
		costRow.unshift(<th>Cost</th>)

		let deletionRow = props.character.Progression.Damage().map ( (v, k) => <td><a className="btn-red" onclick={ctrl.deleteColm} index={k}><i index={k} className="fa fa-times"/></a></td> )
		deletionRow.unshift(<th><a className="btn-red" onclick={ctrl.deleteAll}>Delete All</a></th>)

		let deltaDamageRow = [<th>Change in Damage</th>, <td>NA</td>]
		for(let x = 0; x < props.character.Progression.Damage().length-1; x++) {
			let {Damage} = props.character.Progression
			let change = Damage()[x+1] - Damage()[x]
			let percentage = Math.floor( (Damage()[x+1] / Damage()[x]) * 100 )

			let val = (ctrl.damagePercentage()) ? percentage + "%" : change

			let className = (change > 0) ? 'increasing' : 'decreasing'
			let symbol = (change > 0) ? '+' : (ctrl.damagePercentage()) ? "-" : null
			deltaDamageRow.push( <td className={className}>{symbol} {val}</td> )
		}

		deltaDamageRow.push(<td><input type="checkbox" onchange={ctrl.toggleDamagePercentage} checked={ (ctrl.damagePercentage()) ? "checked" : null } />Percentage?</td>)

		let deltaCostRow = [<th>Change in Cost</th>, <td>NA</td>]
		for(let x = 0; x < props.character.Progression.Cost().length-1; x++) {
			let {Cost} = props.character.Progression
			let change = Cost()[x+1] - Cost()[x]
			let percentage = Math.floor( (Cost()[x+1] / Cost()[x]) * 100 )

			let val = (ctrl.costPercentage()) ? percentage + "%" : change

			let className = (change > 0) ? 'increasing' : 'decreasing'
			let symbol = (change > 0) ? '+' : (ctrl.costPercentage()) ? "-" : null		// this is used to determine wether or not to put a - or + sign. It uses two shorthand if's incase the user wants percentages
			deltaCostRow.push( <td className={className}>{symbol} {val}</td> )
		}
		
		deltaCostRow.push(<td><input type="checkbox" onchange={ctrl.toggleCostPercentage} checked={ (ctrl.costPercentage()) ? "checked" : null } />Percentage?</td>)

		return <table className="CurvesTable">
				<tr>{levelRow}</tr>
				<tr>{damageRow}</tr>
				<tr>{costRow}</tr>
				<tr>{deletionRow}</tr>
				<tr>{deltaDamageRow}</tr>
				<tr>{deltaCostRow}</tr>
		</table>
	}
}

class Curves {
	controller(props) {
		this.id = route.param("id")
		this.characters = Model.Characters
		this.character = (this.id) ? Model.Characters()[this.id] : null

		this.onChange = (e) => route(`curves?id=${e.target.value}`)
	}

	view(ctrl, props, ...children) {
		let {id} = ctrl

		let chooser = <CharacterChooser data={ctrl.characters} changeHandle={ctrl.onChange} />

		let headerRow

		if(ctrl.character)
			headerRow = <div className="row"><h2>Editing Values for {ctrl.character.ID()}</h2></div>
		else
			headerRow = <div className="row">{chooser}</div>

		let tableRow = (!id) ? null : <table className="CurvesTable">
		<tr>
			<th>Level</th>
			<th>0</th>
			<th>1</th>
			<th>2</th>
			<th>3</th>
			<th>4</th>
			<th>5</th>
			<td><button>+</button></td>
		</tr>

		<tr>
			<th>Damage</th>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
		</tr>

		<tr>
			<th>Cost</th>
			<td><input type="text" disabled placeholder="N.A."/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
			<td><input type="text"/></td>
		</tr>

		<tr>
			<th>Delta Damage</th>
			<td>0%</td>
			<td>2%</td>
		</tr>
		</table>

		tableRow = (!id) ? null : <CurvesTable character={ctrl.character}></CurvesTable>

		return <div className="Curves">{headerRow}{tableRow}</div>
	}
}

export default new Curves()