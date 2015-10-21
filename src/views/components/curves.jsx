import m from 'mithril'
let {prop, route} = m

class Curves {
	controller(props) {
		this.id = route.param("id")
	}

	view(ctrl, props, ...children) {
		let {id} = ctrl

		let headerRow

		if(id)
			headerRow = <h2>Editing Values for {id}</h2>
		else
			headerRow = <h2>Curves Editor</h2>

		let tableRow = <table className="CurvesTable">
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
			<td><input type="text"/></td>
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