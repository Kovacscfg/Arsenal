exports.mod = (mod_data) => {
    logger.logInfo(`[MOD] ${mod_data.name}`);
	// we gonna edit cache files in order to add everything - we also not gonna use lateLoaded flag so thsi script will be loaded just after cache is created
	
	//disclaimer: a file name should be an "_id" of an item from items.json
	
	// get data from mod.config.json
	let ModFolderName = `${mod_data.author}-${mod_data.name}-${mod_data.version}`;
	let ModFolders = mod_data.extras;
	let ModFileNames = mod_data.things;
	let PathResolver = global.internal.path.resolve;
	
	// load cache files we need
	let items = global.fileIO.readParsed(PathResolver('user/cache/items.json'));
		
	//we gonna store temporal data here;
	let tDataBase = {};
	
	// you can replace it with reading folder names and file names from directories should be easier to maintain then we will not need folders and filenames made by hand
	// to read all files/folders in specified directory use global.json.readDir(path)
	// a PathResolver should fix the wrong pathing problem :) aka file not found thing
	for(let folder of ModFolders)
	{
		tDataBase[folder] = {};
		for(let file of ModFileNames)
		{
			let fileData = global.fileIO.readParsed(PathResolver(`user/mods/${ModFolderName}/${folder}/${file}.json`));
			
			tDataBase[folder][file] = fileData;
		}
    }
    // process "files/items"
	for(let item in tDataBase["extras/mags"])
	{
		let itemData = tDataBase["extras/mags"][item];
		items.data[item] = itemData;
    }
    
    fileIO.write(PathResolver('user/cache/items.json'), items, true);
    logger.logSuccess(`[MOD] ${mod_data.name}; Applied`);
}