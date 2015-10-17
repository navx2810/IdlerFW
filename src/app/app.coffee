app = require 'app'
BrowserWindow = require 'browser-window'
Menu = require 'menu'

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

