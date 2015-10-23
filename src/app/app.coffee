app = require 'app'
BrowserWindow = require 'browser-window'
Menu = require 'menu'
dialog = require 'dialog'
ipc = require 'ipc'

mainWindow = null

app.on 'window-all-closed', ->
	app.quit()

app.on 'ready', ->
	menu = Menu.buildFromTemplate require './template'
	Menu.setApplicationMenu menu

	mainWindow = new BrowserWindow
		width: 800
		height: 600
		resizeable: false

	mainWindow.loadUrl "file://#{__dirname}/../index.html"

	mainWindow.openDevTools()

	mainWindow.on 'closed', ->
		mainWindow = null

	ipc.on 'show:dialog', (event, arg) =>
		fName = dialog.showOpenDialog
			properties: [ 'openDirectory' ]

		event.sender.send 'dialog:reply', fName[0]

