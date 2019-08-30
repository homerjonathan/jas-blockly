//
// Supports the Use of Blockly - Non Application Specific except it requires Blockly!
//
// Requires AppUtils
//
export { blocklySup }
class BlocklySup {
    constructor() {
        this.blocklyObject = "SamsBlocklyEvent";
        this._BlocklyListEvents = null;
        this._BlocklyListData = null;
    }

    // Get Blockly List of Commands - Needed by App
    GetBlocklyList(done) {
            var _this = this;
            appUtils._GetWithData(appUtils.pathWebRestful + "blockly/list/all", function(success, data) {
                _this.blockly = data;
                if (done != undefined) {
                    done();
                }
            })
        }
        // Build List for Editor of Blockly Events Available
    GetBlocklyListEvents() {
            if (this._BlocklyListEvents === null) {
                this._GetBlocklyList();
            }
            return this._BlocklyListEvents;
        }
        // Build List for Editor of Blockly Data Available
    GetBlocklyListData() {
            if (this._BlocklyListData === null) {
                this._GetBlocklyList();
            }
            return this._BlocklyListData;
        }
        // Processes Blockly Data for GetBlocklyListEvents and GetBlocklyListData
    _GetBlocklyList() {
            // Now Sort the List!
            function compare(a, b) {
                if (a.id == null) {
                    a.id = ""
                }
                if (b.id == null) {
                    b.id = ""
                }
                var nameA = a.id.toLowerCase(),
                    nameB = b.id.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            }

            this.blockly.blockly = this.blockly.blockly.sort(compare);
            var i = 0;
            var aList;
            this._BlocklyListEvents = [];
            this._BlocklyListData = [];
            while (aList = this.blockly.blockly[i++]) {
                if (aList.type === "event") {
                    this._BlocklyListEvents[this._BlocklyListEvents.length] = { "text": aList.id, "value": aList.id };
                } else {
                    this._BlocklyListData[this._BlocklyListData.length] = { "text": aList.id, "value": aList.id };
                }

            }
            // Add In None Option
            this._BlocklyListEvents.unshift({ "value": "", "text": "[none]" });
            this._BlocklyListData.unshift({ "value": "", "text": "[none]" });
        }
        //
        // Run Blockly Generated Code with ID and data pack that links to device controlling
        //
    RunBlocklyCode(id, dataPack) {
            //
            // Looks for Blockly Code and Runs
            //
            var escapedID = id.replace(/ /g, '_');
            this.BlocklyEvent = window[this.blocklyObject];
            if (this.BlocklyEvent != undefined) {
                if (typeof this.BlocklyEvent[escapedID] === "function") {
                    console.log("Running Blockly!");
                    try {
                        this.BlocklyEvent[escapedID](blocklyCMD, dataPack);
                    } catch (e) {
                        console.error(e);
                    }
                    return true;
                } else {
                    console.error("Error: Blockly Command Not Found " + id);
                    return false;
                }
            } else {
                console.error("Error: No Blockly Library Found!");
                return false;
            }
        }
        // Run Blockly Code to process data arriving with ID
    RunBlocklyCodeData(id, data, object) {
        //
        // This will run if it can't find a blockly command
        //
        var escapedID = id.replace(/ /g, '_');
        this.BlocklyEvent = window[this.blocklyObject];
        if (this.BlocklyEvent != undefined) {
            if (typeof this.BlocklyEvent[escapedID] === "function") {
                console.log("Running Blockly!");
                try {
                    this.BlocklyEvent[escapedID](data, blocklyCMD, object);
                } catch (e) {
                    console.error("Error: Running Blockly Command " + id);
                    console.error(e);
                }
                return true;
            } else {
                console.error("Error: Blockly Command Not Found " + id);
                return false;
            }
        } else {
            console.error("Error: No Blockly Library Found!");
            return false;
        }
    }
    reloadSamsBlockly() {
            function reload_js(src) {
                appUtils.each('script[src="' + src + '"]', function(obj) {
                    obj.remove();
                });
                var newSE = document.createElement('script');
                newSE.setAttribute('src', src);
                document.head.appendChild(newSE);
            }

            reload_js('library/sams_blockly.js');
        }
        // Very Basic Check to see if Javascript Generated Source Generated is Legal
    isValidSource(source) {
        try {
            new Function(source);
            console.log("Source Generated checks out OK!");
            return true;
        } catch (err) {
            console.error("Error Generated Javascript by Blockly has an error with: " + err);
            return false;
        }
    }
}
//
// Startup and Create Object
//
var blocklySup;
blocklySup = new BlocklySup();