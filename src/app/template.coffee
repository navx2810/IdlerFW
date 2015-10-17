# I am the file that handles the template for the native menu bar!

Open = 
	label: 'Open a File'
	accelerator: 'CmdOrCtrl+O'
	click: ->
		console.log 'Opening a file, eh?'

Save = 
	label: 'Save to File'
	accelerator: 'CmdOrCtrl+S'
	click: ->
		console.log 'Saving..'

Quit = 
	label: 'Quit'
	accelerator: 'CmdOrCtrl+Q'
	role: 'close'

GetHelp = 
	label: 'Get Help'
	click: ->
		console.log 'Opening a window to the github repo'

template = []

template.push
	label: 'Herro'
	submenu: [Open, Save, Quit]

template.push
	label: 'Help'
	submenu: [GetHelp]

module.exports = template