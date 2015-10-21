import m from 'mithril'
let {prop, route} = m

let CharacterChooser = {
	view(ctrl, props, ...children) {

		let rows = [<option value="0">Matt</option>, <option value="1">Nikita</option>] // Mapping goes here

		rows.unshift(<option disabled selected>select a character</option>)

		return <select onchange={props.changeHandle} name="characterSelector" className="CharacterChooser">
			{rows}
		</select>
	}
}

let CurvesTable = {
	controller(props) {
		this.cellWasChanged = (e) => {

		}
	}, 

	view(ctrl, props, ...children) {


		return <table className="CurvesTable"></table>
	}
}

class Curves {
	controller(props) {
		this.id = route.param("id")
		this.onChange = (e) => route(`curves?id=${e.target.value}`)
	}

	view(ctrl, props, ...children) {
		let {id} = ctrl

		let chooser = <CharacterChooser data={""} changeHandle={ctrl.onChange} />

		let headerRow

		if(id)
			headerRow = <div className="row"><h2>Editing Values for {id}</h2></div>
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

		return <div className="Curves">{headerRow}{tableRow}</div>
	}
}

export default new Curves()