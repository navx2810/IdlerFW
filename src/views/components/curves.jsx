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

		return <div>{headerRow}</div>
	}
}

export default new Curves()