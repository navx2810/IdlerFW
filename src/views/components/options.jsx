import m from 'mithril'
let {prop} = m

let Options = {
	controller(props) {
		this.directory = prop("Nothing yet")

		this.changeDirectory = (e) => ipc.send('show:dialog')

		ipc.on('dialog:reply', (arg) => {
			m.startComputation()
			this.directory(arg)
			m.endComputation()
		})
	},

	view(ctrl, props, ...children) {
		let headerRow = <div className="row header"><h2>Options</h2></div>

		let exportPath = <div className="row">Save Directory: <em>{ctrl.directory()}</em> <i className="fa fa-folder-open" onclick={ctrl.changeDirectory}/></div>

		return <div className="Options">
			{headerRow}
			<div className="container"> {exportPath} </div>
		</div>
	}
}

export default Options