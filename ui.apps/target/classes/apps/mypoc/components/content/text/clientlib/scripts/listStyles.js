(function(){
    var ListStyles = {};


  //********************tool bar builder******************************************

    CUI.rte.ui.cui.CuiToolbarBuilder = new Class({

        toString: "ListStylesCuiToolbarBuilder",

        extend: CUI.rte.ui.cui.CuiToolbarBuilder,

        _getUISettings: function (options) {

            console.log("liststylesCuiToolbarBuilder _getUISettings",options);


        var uiSettings = this.superClass._getUISettings(options);
        //var uiSettings = this.inherited(arguments)


		//add plugins to fullscreen toolbar
        var toolbar = uiSettings["fullscreen"]["toolbar"];
		var popovers = uiSettings["fullscreen"]["popovers"];



        // Font Styles
        if (toolbar.indexOf("#liststyles") == -1) {

        	toolbar.splice(11, 0,"#liststyles");
        }
		if (!popovers.hasOwnProperty("liststyles")) {
            popovers.liststyles = {
            	"ref": "liststyles",
                "items": "liststyles:getStyles:liststyles-pulldown"
            };
        }

        return uiSettings;
    },

        // Styles dropdown builder
    createListStyleSelector: function(id, plugin, tooltip, styles) {


        console.log("createliststylesSelector:::id:::plugin:::tooltip::::styles",id,plugin,tooltip,styles);

        return new  ListStyles.ListStylesSelectorImpl(id, plugin, false, tooltip, false,undefined, styles);

    }

    });


  //**************************************extend CUI toolkit impl to create instances of extended toolbar builder and dialog manager

     CUI.rte.ui.cui.ToolkitImpl = new Class({

        toString: "liststylesToolkitImpl",

        extend: CUI.rte.ui.cui.ToolkitImpl,

        createToolbarBuilder: function() {
            //alert("from init to tablestyles inside ToolkitImpl");
            console.log(" inside:::::::ToolkitImpl::createToolbarBuilder");

             return new  CUI.rte.ui.cui.CuiToolbarBuilder();
        }
    });


  //******************************register the  ToolkitImpl*********************************************

    CUI.rte.ui.ToolkitRegistry.register("cui",CUI.rte.ui.cui.ToolkitImpl);


 /*********************************************************TableStyleSelectorImpl*********************************/


    ListStyles.ListStylesSelectorImpl = new Class({

        toString: 'ListStylesSelectorImpl',

    extend: CUI.rte.ui.TbStyleSelector,

    // Helpers -----------------------------------------------------------------------------

    notifyGroupBorder: function () {
      // do nothing
    },

    _getStyleId: function ($button) {
         console.log(" inside _getStyleId of liststylesSelectorImpl",$button);

        //alert("_getStyleId");
      var styleId = null;
      var targetId = $button.data('action');
      var hashPos = targetId.indexOf('#');
      if (hashPos >= 0) {
        styleId = targetId.substring(hashPos + 1);
      }
      return styleId;
    },

    _resetSelection: function () {
         console.log(" inside _resetSelection of liststylesSelectorImpl");
      this.$ui.each(function () {
        this.icon = '';
      });
    },

    _select: function (styleToSelect) {
      console.log(" inside_select of liststylesSelectorImpl");
      var self = this;
      this.$ui.each(function () {
        var $fmtItem = $(this);
        var styleId = self._getStyleId($fmtItem);
        if (styleId && (styleId === styleToSelect)) {
          this.icon = 'check' ;
        }
      });
    },


    // Interface implementation ------------------------------------------------------------

    addToToolbar: function (toolbar) {
        console.log(" inside addToToolbar of liststylesSelectorImpl");
      this.toolbar = toolbar;
    },

    notifyToolbar: function (toolbar, skipHandlers) {


        console.log(" inside notifyToolbar of liststylesSelectorImpl::::toolbar:::::::::skipHandlers:::::::",toolbar,skipHandlers);
      this.toolbar = toolbar;
      var self = this;

        console.log(" notifyToolbar this::::::::::::::",this);
      var pluginId = this.plugin.pluginId;
        console.log("pluginID: inside notify toolbar::::::::::::::",pluginId);

      var $cont = toolbar.getToolbarContainer();
 console.log("$cont::::::::::::inside notify toolbar",$cont);
      var tbType = toolbar.tbType;
        console.log("tbType::::::::::::inside notify toolbar",tbType);
var $button = $(this).find('button');
console.log("$button::::::::::::inside notify  $button",$button);
        console.log("$button::::::::::::inside notify  $button.text()", $button.text());
      if (!this.plugin.hasStylesConfigured()) {
            console.log("!this.plugin.hasStylesConfigured()::::::::::::inside notify toolbar");
        var styles = [];
        var $popover = CUI.rte.UIUtils.getPopover(pluginId, tbType, $cont);
        console.log("$popover::::::::::::inside notify toolbar",$popover);
        var $styleItems = $popover.find('li');
        $styleItems.each(function () {
          var $button = $(this).find('button');
          var href = $button.data('action');
          var action = href.split('#');
          if ((action.length === 2) && (action[0] === pluginId)) {
            styles.push({
              'cssName': action[1],
              'text': $button.text()
            });
          }
        });
           console.log("this.plugin::::::::::::inside notify toolbar",this.plugin);
        this.plugin.setStyles(styles);
      }
      var $tbCont = CUI.rte.UIUtils.getToolbarContainer($cont, tbType);


      this.$trigger = $tbCont.find('button[data-action="#' + pluginId + '"]');
      this.$ui = $tbCont.find('button[data-action^="' + pluginId + '#"]');

    console.log("this.$ui ::::::::::::inside notify toolbar",this.$ui);
      if (!skipHandlers) {

           console.log("!skipHandlers ::::::::::::inside notify toolbar IF");
        this.$ui.on('click.rte-handler', function (e) {
             alert("Custom inside click");
          if (!self.$ui.hasClass(CUI.rte.Theme.TOOLBARITEM_DISABLED_CLASS)) {
         alert("custom inside click if");
            var targetId = $(this).data('action');
            var hashPos = targetId.indexOf('#');
            var style = targetId.substring(hashPos + 1);
            var editContext = self.plugin.editorKernel.getEditContext();
            editContext.setState('CUI.SelectionLock', 1);
             console.log("self.plugin",self.plugin);

                  self.plugin.execute('liststyles', style);
                  self.plugin.editorKernel.enableFocusHandling();
                   self.plugin.editorKernel.focus(editContext);



          }
          // e.stopPropagation();
        }
                   );
      }
    },

    createToolbarDef: function () {
        console.log("createToolbarDef ::::::::::::inside createToolbarDef of liststylesSelectorImpl:::::::::::::this.id:::::::::::this",this.id,this);
      return {
        'id': this.id,
        'element': this
      };
    },

    initializeSelector: function () {
      // TODO ...?
    },

    getSelectorDom: function () {
        console.log("getSelectorDom ::::::::::::inside getSelectorDom of liststylesSelectorImpl:");
      return this.$ui;
    },

    getSelectedStyle: function () {
      return null;
    },

    selectStyles: function (styles, selDef) {
        console.log("::::::::::::inside selectStyles of liststylesSelectorImpl:");
      this.setSelected(styles.length > 0);
      this._resetSelection();
      for (var s = 0; s < styles.length; s++) {
        this._select(styles[s].className);
      }
    },

    setDisabled: function (isDisabled) {
           console.log("::::::::::::inside setDisabled of liststylesSelectorImpl:");
      var com = CUI.rte.Common;
      if (com.ua.isTouchInIframe) {
        // workaround for CUI-649; see ElementImpl#setDisabled for an explanation
        this.$trigger.css('display', 'none');
      }
      if (isDisabled) {
        this.$trigger.addClass(CUI.rte.Theme.TOOLBARITEM_DISABLED_CLASS);
        this.$trigger.attr('disabled', 'disabled');
      } else {
        this.$trigger.removeClass(CUI.rte.Theme.TOOLBARITEM_DISABLED_CLASS);
        this.$trigger.removeAttr('disabled');
      }
      if (com.ua.isTouchInIframe) {
        // part 2 of workaround for CUI-649
        var self = this;
        window.setTimeout(function () {
          self.$trigger.css('display', 'inline-block');
        }, 1);
      }
    },

    setSelected: function (isSelected, suppressEvent) {
       console.log("::::::::::::inside setSelected of liststylesSelectorImpl:");
      this._isSelected = isSelected;
      if (isSelected) {
        this.$trigger.addClass(CUI.rte.Theme.TOOLBARITEM_SELECTED_CLASS);
      } else {
        this.$trigger.removeClass(CUI.rte.Theme.TOOLBARITEM_SELECTED_CLASS);
      }
    },

    isSelected: function () {
      return this._isSelected;
    }


});




   //******************************the color picker plugin for touch ui*********************************************

    ListStyles.ListStylesPlugin = new Class({
        toString: "ListStylesPlugin",

        extend: CUI.rte.plugins.Plugin,

        liststylescachedStyles: null,

        liststylesUI: null,

         getFeatures: function() {
          console.log(" inside getFeatures");
            return [ 'liststyles' ];
        },

     reportStyles: function() {
          console.log(" inside reportStyles");
        return [ {
                'type': 'text',
                'liststyles': this.getStyles()
            }
        ];
    },


    getStyleId: function(dom) {
     console.log(" inside getStyleId");
        var tagName = dom.tagName.toLowerCase();
        var styles = this.getStyles();
        var stylesCnt = styles.length;
        for (var f = 0; f < stylesCnt; f++) {
            var styleDef = styles[f];
            //TODO: We need to handle span class, not tag
            if (styleDef.tag && (styleDef.tag == tagName)) {
                return styleDef.tag;
            }
        }
        return null;
    },

	getStyles: function() {
        console.log(" inside getStyles");

        var com = CUI.rte.Common;
        if (!this.liststylescachedStyles) {
            this.liststylescachedStyles = this.config.liststyles || { };

            if (this.liststylescachedStyles) {
                // take styles from config
                com.removeJcrData(this.liststylescachedStyles);
                this.liststylescachedStyles = com.toArray(this.liststylescachedStyles, 'cssName', 'text');

            } else {
                this.liststylescachedStyles = [ ];

            }
        }

        return this.liststylescachedStyles;
    },

    setStyles: function(styles) {

         console.log(" inside setStyles",styles);

        this.liststylescachedStyles = styles;
    },

    hasStylesConfigured: function() {
       console.log(" inside hasStylesConfigured");

        return !!this.config.liststyles;
    },

    initializeUI: function(tbGenerator, options) {
         //alert("this"+this);
        console.log(" inside initializeUI of plugin:::tbGenerator;;;;;options",tbGenerator,options);
        var plg = CUI.rte.plugins;
        if (this.isFeatureEnabled('liststyles')) {


            console.log(" inside initializeUI this.isFeatureEnabled inside if ");
            this.liststylesUI = new tbGenerator.createListStyleSelector('liststyles', this, null,
            this.getStyles());
           tbGenerator.addElement('liststyles', '380', this.liststylesUI, 10);
        }
         tbGenerator.registerIcon('#liststyles', 'tumblr');
    },

	notifyPluginConfig: function(pluginConfig) {
        console.log(" inside notifyPluginConfig of plugin",pluginConfig);

        pluginConfig = pluginConfig || { };
        CUI.rte.Utils.applyDefaults(pluginConfig, { });
        this.config = pluginConfig;

     /*   pluginConfig = pluginConfig || { };
        var defaults = {
            "tablestyles": [ {
                    "text": "strikethrough",
                    "cssName": "strikethrough"
                }, {
                    "text": "test",
                    "cssName": "test"
                }
            ]
        };
        if (pluginConfig.tablestyles) {
            delete defaults.tablestyles;
        }
        CUI.rte.Utils.applyDefaults(pluginConfig, defaults);
        this.config = pluginConfig;*/
    },

        execute: function (cmdId, styleDef) {

          console.log(" inside execute of plugin",cmdId,styleDef);
      if (!this.liststylesUI) {
        return;
      }
      var cmd = null;
      var tagName;
      var className;
      switch (cmdId.toLowerCase()) {
      case 'liststyles':
        cmd = 'liststyles';
        tagName = 'span';
        className = ((styleDef !== null && styleDef !== undefined) ? styleDef : this.liststylesUI.getSelectedStyle());
        break;
      }
      if (cmd && tagName && className) {
        this.editorKernel.relayCmd(cmd, {
          'tag': tagName,
          'attributes': {
            'class': className
          }
        });
      }
    },

	updateState: function(selDef) {
       console.log(" inside updateState of plugin",selDef);
        if (!this.liststylesUI) {
            return;
        }
        var com = CUI.rte.Common;
        var styles = selDef.startStyles;

        var actualStyles = [ ];
        var s;
        var styleableObject = selDef.selectedDom;
        if (styleableObject) {
            if (!CUI.rte.Common.isTag(selDef.selectedDom,
                    "img")) {
                styleableObject = null;
            }
        }
        var stylesDef = this.getStyles();
        var styleCnt = stylesDef.length;
        if (styleableObject) {
            for (s = 0; s < styleCnt; s++) {
                var styleName = stylesDef[s].cssName;
                if (com.hasCSS(styleableObject, styleName)) {
                    actualStyles.push({
                        'className': styleName
                    });
                }
            }
        } else {
            var checkCnt = styles.length;
            for (var c = 0; c < checkCnt; c++) {
                var styleToProcess = styles[c];
                var currentStyles = styleToProcess.className.split(" ");
                for(var j=0; j<currentStyles.length; j++) {
                    for (s = 0; s < styleCnt; s++) {
						if (stylesDef[s].cssName == currentStyles[j]) {
                            actualStyles.push(currentStyles[j]);
                            break;
                        }
                    }
				}
            }
        }
        this.liststylesUI.selectStyles(actualStyles, selDef);
    }




    });

    //*****************************************rigister the CustomListPlugin *********************************

    CUI.rte.plugins.PluginRegistry.register('liststyles',ListStyles.ListStylesPlugin);


    //*****************************************the command for making list logic*********************************


    ListStyles.ListStylesCmd = new Class({

        toString: "ListStylesCmd",

        extend: CUI.rte.commands.Command,

       isCommand: function(cmdStr) {
         console.log(" inside isCommand of command",cmdStr);
        return (cmdStr.toLowerCase() == "liststyles");
       },


        getProcessingOptions: function() {
            var cmd = CUI.rte.commands.Command;
            return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
        },

      /*  getStyleType: function(listStyleType) {
            var atr="list-style-type";

            switch (listStyleType.toLowerCase()) {
                case "red":
                    atr = "class";
                    break;

                    
            }
            
            return {
                atr: listStyleType

            };
        },*/
        _getParamsFromExecDef: function(execDef) {
        console.log(" inside _getParamsFromExecDef of command",execDef);
        var cmdLC = execDef.command.toLowerCase();
        var isStyle = (cmdLC === "liststyles");
        var tagName, attributes;
        if (isStyle) {
            tagName = execDef.value.tag;
            attributes = execDef.value.attributes;
        }
        return {
            "tag": tagName,
            "attributes": attributes,
            "isStyle": isStyle
        };
    },


        /**
        * Gets all list items of the current selection. Using this method will not include
        * items of a nested list if a nested list is completely covered in the selection.
        * @private
        */
        getListItems: function(execDef) {
            var context = execDef.editContext;
            return execDef.nodeList.getTags(context, [ {
                "extMatcher": function(dom) {
                    return {
                        "isMatching": CUI.rte.Common.isTag(dom, "li"),
                        "preventRecursionIfMatching": true
                    };
                }
            }
                                                     ], true, true);
        },
        
        /**
        * Gets all list items of the current selection. Using this method will include
        * items of a nested list as well.
        * @private
        */
        getAllListItems: function(execDef) {
            var context = execDef.editContext;
            var allItems = execDef.nodeList.getTags(context, [ {
                "matcher": function(dom) {
                    return CUI.rte.Common.isTag(dom, "li");
                }
            }
                                                             ], true, true);
            CUI.rte.ListUtils.postprocessSelectedItems(allItems);
            return allItems;
        },

        /**
        * Gets the defining list element for the specified node list. The defining list element
        * is the list element that belongs to the first node contained in the list.
        * @param {CUI.rte.EditContext} context The edit context
        * @param {CUI.rte.NodeList} nodeList The node list
        * @return {HTMLElement} The defining list DOM; null if the first node of the list
        *         is not part of a list
        */
        getDefiningListDom: function(context, nodeList) {
            var com = CUI.rte.Common;
            var determNode = nodeList.getFirstNode();
            if (determNode == null) {
                return null;
            }
            var determDom = determNode.dom;
            while (determDom) {
                if (com.isTag(determDom, com.LIST_TAGS)) {
                    return determDom;
                }
                determDom = com.getParentNode(context, determDom);
            }
            return null;
        },

        /**
        * Splits the specified array of list items into separate arrays of items for each
        * top-level list.
        * @private
        */
        splitToTopLevelLists: function(execDef, listItems) {
            var context = execDef.editContext;
            var itemsPerList = [ ];
            var topLevelLists = [ ];
            var itemCnt = listItems.length;
            for (var i = 0; i < itemCnt; i++) {
                var itemToCheck = listItems[i];
                var listDom = CUI.rte.ListUtils.getTopListForItem(context, itemToCheck.dom);
                var listIndex = CUI.rte.Common.arrayIndex(topLevelLists, listDom);
                if (listIndex < 0) {
                    topLevelLists.push(listDom);
                    itemsPerList.push([ itemToCheck ]);
                } else {
                    itemsPerList[listIndex].push(itemToCheck);
                }
            }
            return itemsPerList;
        },

        /*********************Changes the list type of all selected list items, inserting additional tables*************************************************

        /**
        * Changes the list type of all selected list items, inserting additional tables
        * as required.
        * @private
        */
        changeItemsListType: function(execDef, listItems, listStyleType) {

            //console.log("CustomListCmd--execute--changeItemsListType");

            var listType ="ul";
            var com = CUI.rte.Common;
            var context = execDef.editContext;
            var itemCnt = listItems.length;

            for (var i = 0; i < itemCnt; i++) {
                var item = listItems[i].dom;
                var list = item.parentNode;
                if (!com.isTag(list, listType)) {
                    // Change item ...
                    var prevSib = list.previousSibling;
                    var nextSib = list.nextSibling;
                    var isFirst = (com.getChildIndex(item) == 0);
                    var isLast = (com.getChildIndex(item) == (list.childNodes.length - 1));
                    if (isFirst && prevSib && com.isTag(prevSib, listType)) {
                        // move to preceding list of correct type
                        list.removeChild(item);
                        prevSib.appendChild(item);
                        if (list.childNodes.length == 0) {
                            list.parentNode.removeChild(list);
                        }
                    } else if (isLast && nextSib && com.isTag(nextSib, listType)) {
                        // move to succeeding list of correct type
                        list.removeChild(item);
                        com.insertBefore(nextSib, item, nextSib.firstChild);
                        if (list.childNodes.length == 0) {
                            list.parentNode.removeChild(list);
                        }
                    } else {
                        // we need a new list
                        var newList = context.createElement(listType);
                        if (item == list.firstChild) {
                            // create new list before existing list
                            com.insertBefore(list.parentNode, newList, list);
                        } else if (item == list.lastChild) {
                            // create new list after existing list
                            com.insertBefore(list.parentNode, newList, list.nextSibling);
                        } else {
                            // split list
                            var splitList = list.cloneNode(false);
                            com.insertBefore(list.parentNode, splitList, list);
                            com.insertBefore(list.parentNode, newList, list);
                            while (list.childNodes[0] != item) {
                                var domToMove = list.childNodes[0];
                                list.removeChild(domToMove);
                                splitList.appendChild(domToMove);
                            }
                        }
                        list.removeChild(item);
                        newList.appendChild(item);
                        if (list.childNodes.length == 0) {
                            list.parentNode.removeChild(list);
                        }
                    }
                    
                }
            }

//com.setAttribute(newList, "style",style);


                com.setAttribute(newList, "class",listStyleType);



        },

        /*********************this method is called only to create list first time ********************************************/


        createList: function(context, blockList, listStyleType) {
             //console.log("CustomListCmd--execute---createListFromSelection--createList");

            var listType = "ul";
            var com = CUI.rte.Common;
            var dpr = CUI.rte.DomProcessor;
            var lut = CUI.rte.ListUtils;


            var style = "list-style-type:"+listStyleType;

            // preprocess if a table cell is reported as the only edit block
            if ((blockList.length == 1) && com.isTag(blockList[0], com.TABLE_CELLS)) {
                var tempBlock = context.createElement("div");
                com.moveChildren(blockList[0], tempBlock);
                blockList[0].appendChild(tempBlock);
                blockList[0] = tempBlock;
            }
            // simplify block list by using lists instead of their respective list items
            var blockCnt = blockList.length;
            for (var b = 0; b < blockCnt; b++) {
                if (com.isTag(blockList[b], "li")) {
                    var listNode = blockList[b].parentNode;
                    blockList[b] = listNode;
                    for (var b1 = 0; b1 < b; b1++) {
                        if (blockList[b1] == listNode) {
                            blockList[b] = null;
                            break;
                        }
                    }
                }
            }
            // common list creation
            var listDom = context.createElement("ul");

                com.setAttribute(listDom, "class",listStyleType);


            blockCnt = blockList.length;
            for (b = 0; b < blockCnt; b++) {
                var blockToProcess = blockList[b];

                if (blockToProcess) {
                    var mustRecurse = com.isTag(blockToProcess, dpr.AUXILIARY_ROOT_TAGS);
                    if (!mustRecurse) {
                        if (listDom.childNodes.length == 0) {
                            // first, insert the list
                            blockToProcess.parentNode.insertBefore(listDom, blockToProcess);
                        }
                        if (!com.isTag(blockToProcess, com.LIST_TAGS)) {
                            // normal blocks
                            var listItemDom = context.createElement("li");
                            listDom.appendChild(listItemDom);

                            //console.log("listDom",listDom);
                            com.moveChildren(blockToProcess, listItemDom, 0, true);
                            blockToProcess.parentNode.removeChild(blockToProcess);
							console.log("blockToProcess",blockToProcess);
                        } else {
                            // pre-existing list
                            com.moveChildren(blockToProcess, listDom, 0, true);
                            blockToProcess.parentNode.removeChild(blockToProcess);
                        }
                    } else {
                        // create list recursively
                        var subBlocks = [ ];
                        var sbCnt = blockToProcess.childNodes.length;
                        for (var c = 0; c < sbCnt; c++) {
                            var subBlock = blockToProcess.childNodes[c];
                            if (com.isTag(subBlock, com.EDITBLOCK_TAGS)) {
                                subBlocks.push(subBlock);
                            } else if (com.isTag(com.BLOCK_TAGS)) {
                                // todo nested tables
                            }
                        }
                        if (subBlocks.length == 0) {
                            subBlocks.push(blockToProcess);
                        }
                        lut.createList(context, subBlocks, listType);
                        // start a new list if a non-listable tag has been encountered
                        listDom = context.createElement(listType);

                    }
                }
            }
            // check if we can join adjacent lists
            var prevSib = listDom.previousSibling;
            if (prevSib && com.isTag(prevSib, listType)) {
                com.moveChildren(listDom, prevSib, 0, true);
                listDom.parentNode.removeChild(listDom);
                listDom = prevSib;
            }
            var nextSib = listDom.nextSibling;
            if (nextSib && com.isTag(nextSib, listType)) {
                com.moveChildren(nextSib, listDom, 0, true);
                nextSib.parentNode.removeChild(nextSib);
            }
        },

    /*********************Creates a new list from all (allowed) block nodes defined in the selection.********************************************

    /**
     * Creates a new list from all (allowed) block nodes defined in the selection.
     * @private
     */
        createListFromSelection: function(execDef, listStyleType) {
             //console.log("CustomListCmd--createListFromSelection");

            var nodeList = execDef.nodeList;
            var listType="ul";
            var context = execDef.editContext;
           // var tagObj = this.getStyleType(listStyleType);
            var blockLists = nodeList.getEditBlocksByAuxRoots(context, true);
            var listCnt = blockLists.length;

            for (var l = 0; l < listCnt; l++) {
                this.createList(context, blockLists[l], listStyleType)

            }
        },

       /********************* Removes items from a list by appending them to their respective parent item********************************************

        /**
        * Removes items from a list by appending them to their respective parent item
        * (including a separating "br" line break).
        * @private
        */
        unlistItems: function(execDef, listItems, keepStructure) {
             //console.log("CustomListCmd--execute--unlistItems");
            if (!listItems) {
                listItems = this.getAllListItems(execDef);
            }
            var context = execDef.editContext;
            var itemCnt = listItems.length;
            var itemsDom = [ ];
            for (var i = 0; i < itemCnt; i++) {
                itemsDom.push(listItems[i].dom);
            }
            CUI.rte.ListUtils.unlistItems(context, itemsDom, keepStructure);
        },



        /*********************this method is called only when we click on the icon********************************************/


        execute: function(execDef) {

            alert("inside command exe");
             //console.log("CustomListCmd--execute");
            
            var com = CUI.rte.Common;
            var context = execDef.editContext;
            
            var nodeList = execDef.nodeList;
            var command = execDef.command;

            //var tagObj = this.getStyleType(command);
            var value = execDef.value;

            var listType="ul";
            // var styleName = def.attributes['class'];
            var listStyleType = execDef.value.attributes['class'];
            console.log("command:::",command,listStyleType);
            //nodeList.commonAncestor.firstChild.surround(execDef.editContext, tagObj.tag, tagObj.attributes);

            //
            if (listType) {
                var listItems;
                var refList = this.getDefiningListDom(context, nodeList);
                var classValue = com.getAttribute(refList,"class", true);
                var stylevalue=com. getAttribute(refList, "style", true);
                alert("classValue"+classValue);
                // var commandcheck = command+";";
                if(stylevalue!=null){

                    var propNameValue = stylevalue.split(':');
                    var propNameValue1 = propNameValue[1];
                    
                    //console.log("propNameValue::: ",propNameValue[1]);
                    
                    //console.log("stylevalue::: ",stylevalue);
                }
                
                if (refList == null) {
                    this.createListFromSelection(execDef, listStyleType);
                }else if (!com.isTag(refList, listType)){
                   listItems = this.getListItems(execDef);
                    this.changeItemsListType(execDef, listItems, listStyleType);
                    
                }else if (!(command == propNameValue1)) {
                   var style = "list-style-type:"+listStyleType;
                    //com.setAttribute(refList, "style",style);

                    if(classValue==listStyleType){
                        alert("GGGGGGGGGGGGG");
                         listItems = this.getAllListItems(execDef);

                    if (listItems.length > 0) {
                        var itemsByList = this.splitToTopLevelLists(execDef, listItems);
                        var listCnt = itemsByList.length;
                        for (var l = 0; l < listCnt; l++) {
                            listItems = itemsByList[l];
                            this.unlistItems(execDef, listItems, value === true);
                        }

                       }
                    }
                  else{
                           com.removeAllClasses(refList);

                          com.setAttribute(refList, "class",listStyleType);
                       }
                 }

                else {
                    // unlist all items of lead list
                    listItems = this.getAllListItems(execDef);

                    if (listItems.length > 0) {
                        var itemsByList = this.splitToTopLevelLists(execDef, listItems);
                        var listCnt = itemsByList.length;
                        for (var l = 0; l < listCnt; l++) {
                            listItems = itemsByList[l];
                            this.unlistItems(execDef, listItems, value === true);
                        }
                    }
                }
            }
        }

    });

     //************************************register CustomListCmd command*****************************

    CUI.rte.commands.CommandRegistry.register("liststyles",ListStyles.ListStylesCmd);





})();
