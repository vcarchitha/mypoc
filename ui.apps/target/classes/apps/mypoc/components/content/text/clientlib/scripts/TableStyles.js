(function(){

    var TableStyles = {};




    //******************************CUI.rte.ui.cui.CuiToolbarBuilder*********************************************


    CUI.rte.ui.cui.CuiToolbarBuilder = new Class({

        toString: "TablestylesCuiToolbarBuilder",

        extend: CUI.rte.ui.cui.CuiToolbarBuilder,

        _getUISettings: function (options) {

            console.log("inside tablestylesCuiToolbarBuilder _getUISettings",options);


        var uiSettings = this.superClass._getUISettings(options);
        //var uiSettings = this.inherited(arguments)


		//add plugins to fullscreen toolbar
        var toolbar = uiSettings["fullscreen"]["toolbar"];
		var popovers = uiSettings["fullscreen"]["popovers"];



        // Font Styles
        if (toolbar.indexOf("#tablestyles") == -1) {

        	toolbar.splice(10, 0,"#tablestyles");
        }
		if (!popovers.hasOwnProperty("tablestyles")) {
            popovers.tablestyles = {
            	"ref": "tablestyles",
                "items": "tablestyles:getStyles:tablestyles-pulldown"
            };
        }

        return uiSettings;
    },

        // Styles dropdown builder
    createTableStyleSelector: function(id, plugin, tooltip, styles) {


        console.log("createtablestylesSelector:::id:::plugin:::tooltip::::styles",id,plugin,tooltip,styles);

        return new  TableStyles.TablestylesSelectorImpl(id, plugin, false, tooltip, false,undefined, styles);

    }

    });

//**************************************extend CUI toolkit impl to create instances of extended toolbar builder and dialog manager

     CUI.rte.ui.cui.ToolkitImpl = new Class({

        toString: "tablestylesToolkitImpl",

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


    TableStyles.TablestylesSelectorImpl = new Class({

        toString: 'TablestylesSelectorImpl',

    extend: CUI.rte.ui.TbStyleSelector,

    // Helpers -----------------------------------------------------------------------------

    notifyGroupBorder: function () {
      // do nothing
    },

    _getStyleId: function ($button) {
         console.log(" inside _getStyleId of tablestylesSelectorImpl",$button);

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
         console.log(" inside _resetSelection of tablestylesSelectorImpl");
      this.$ui.each(function () {
        this.icon = '';
      });
    },

    _select: function (styleToSelect) {
      console.log(" inside_select of tablestylesSelectorImpl");
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
        console.log(" inside addToToolbar of tablestylesSelectorImpl");
      this.toolbar = toolbar;
    },

    notifyToolbar: function (toolbar, skipHandlers) {


        console.log(" inside notifyToolbar of tablestylesSelectorImpl::::toolbar:::::::::skipHandlers:::::::",toolbar,skipHandlers);
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

                  self.plugin.execute('tablestyles', style);
                  self.plugin.editorKernel.enableFocusHandling();
                   self.plugin.editorKernel.focus(editContext);



          }
          // e.stopPropagation();
        }
                   );
      }
    },

    createToolbarDef: function () {
        console.log("createToolbarDef ::::::::::::inside createToolbarDef of tablestylesSelectorImpl:::::::::::::this.id:::::::::::this",this.id,this);
      return {
        'id': this.id,
        'element': this
      };
    },

    initializeSelector: function () {
      // TODO ...?
    },

    getSelectorDom: function () {
        console.log("getSelectorDom ::::::::::::inside getSelectorDom of tablestylesSelectorImpl:");
      return this.$ui;
    },

    getSelectedStyle: function () {
      return null;
    },

    selectStyles: function (styles, selDef) {
        console.log("::::::::::::inside selectStyles of tablestylesSelectorImpl:");
      this.setSelected(styles.length > 0);
      this._resetSelection();
      for (var s = 0; s < styles.length; s++) {
        this._select(styles[s].className);
      }
    },

    setDisabled: function (isDisabled) {
           console.log("::::::::::::inside setDisabled of tablestylesSelectorImpl:");
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
       console.log("::::::::::::inside setSelected of tablestylesSelectorImpl:");
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




/********************************************************plugin Impl******************************************/

TableStyles.TablestylesPlugin = new Class({

        toString: "TablestylesPlugin",

        extend: CUI.rte.plugins.Plugin,

    /**
     * @private
     */
    tablestylescachedStyles: null,

    /**
     * @private
     */
    tablestylesUI: null,

    getFeatures: function() {
      console.log(" inside getFeatures");
        return [ 'tablestyles' ];
    },

     reportStyles: function() {
          console.log(" inside reportStyles");
        return [ {
                'type': 'text',
                'tablestyles': this.getStyles()
            }
        ];
    },

    /**
     * @private
     */
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
        if (!this.tablestylescachedStyles) {
            this.tablestylescachedStyles = this.config.tablestyles || { };

            if (this.tablestylescachedStyles) {
                // take styles from config
                com.removeJcrData(this.tablestylescachedStyles);
                this.tablestylescachedStyles = com.toArray(this.tablestylescachedStyles, 'cssName', 'text');

            } else {
                this.tablestylescachedStyles = [ ];

            }
        }

        return this.tablestylescachedStyles;
    },

    setStyles: function(styles) {

         console.log(" inside setStyles",styles);

        this.tablestylescachedStyles = styles;
    },

    hasStylesConfigured: function() {
       console.log(" inside hasStylesConfigured");

        return !!this.config.tablestyles;
    },

    initializeUI: function(tbGenerator, options) {
         //alert("this"+this);
        console.log(" inside initializeUI of plugin:::tbGenerator;;;;;options",tbGenerator,options);
        var plg = CUI.rte.plugins;
        if (this.isFeatureEnabled('tablestyles')) {


            console.log(" inside initializeUI this.isFeatureEnabled inside if ");
            this.tablestylesUI = new tbGenerator.createTableStyleSelector('tablestyles', this, null,
            this.getStyles());
           tbGenerator.addElement('tablestyles', '380', this.tablestylesUI, 10);
        }
         tbGenerator.registerIcon('#tablestyles', 'tumblr');
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
      if (!this.tablestylesUI) {
        return;
      }
      var cmd = null;
      var tagName;
      var className;
      switch (cmdId.toLowerCase()) {
      case 'tablestyles':
        cmd = 'tablestyles';
        tagName = 'span';
        className = ((styleDef !== null && styleDef !== undefined) ? styleDef : this.tablestylesUI.getSelectedStyle());
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
        if (!this.tablestylesUI) {
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
        this.tablestylesUI.selectStyles(actualStyles, selDef);
    }
});

CUI.rte.plugins.PluginRegistry.register("tablestyles", TableStyles.TablestylesPlugin);


/*********************************************************commandImpl*************************************/

  TableStyles.TablestylesCommandImpl = new Class({
    
    toString: "TablestylesCommandImpl",
    
    extend: CUI.rte.commands.Command,

    isCommand: function(cmdStr) {
         console.log(" inside isCommand of command",cmdStr);
        return (cmdStr.toLowerCase() == "tablestyles");
    },

       _getParamsFromExecDef: function(execDef) {
        console.log(" inside _getParamsFromExecDef of command",execDef);
        var cmdLC = execDef.command.toLowerCase();
        var isStyle = (cmdLC === "tablestyles");
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

        getDefiningListDom: function(context, nodeList) {
             console.log(" inside getDefiningListDom of command",context,nodeList);
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


    getProcessingOptions: function() {
         console.log(" inside getProcessingOptions of command");
        var cmd = CUI.rte.commands.Command;
        return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
    },

    addStyle: function(execDef) {

        //console.log("execDef",execDef);
         console.log(" inside addStyle of command",execDef);
       var sel = CUI.rte.Selection;
        var com = CUI.rte.Common;
        var styleName = execDef.value;
        //alert("styleName"+styleName)
         console.log("styleName",styleName);
        var selection = execDef.selection;
         //alert("selection"+selection)
          console.log("selection",selection);
        var context = execDef.editContext;
         var def = this._getParamsFromExecDef(execDef);
            console.log("def",def);
             console.log("context",context);
        // handle DOM elements
        var selectedDom = sel.getSelectedDom(context, selection);

        console.log("selectedDom",selectedDom);
        var styleableObjects = "imd";
        if (selectedDom && com.isTag(selectedDom, styleableObjects)) {

            com.removeAllClasses(selectedDom);
            com.addClass(selectedDom, styleName);
            return;
        }
        // handle text fragments
        var nodeList = execDef.nodeList;
         var refList = this.getDefiningListDom(context, nodeList);
           console.log("refList",refList);
         var determNode = nodeList.getFirstNode();

        console.log("determNode",determNode);
             if (nodeList) {
                 var tableParent = com.getTagInPath(context, execDef.nodeList.commonAncestor, "table");
            // var listDom = context.createElement("div");
            //com.addClass(listDom,styleName);
                   //com.removeAllClasses(selectedDom);
                 if(!(tableParent == null)){
                   nodeList.removeNodesByTag(execDef.editContext, def.tag, def.attributes, true);
                     if("removestyle"=== execDef.value.attributes.class){

                         com.removeAttribute(tableParent,"class");

                     }

                      com.setAttribute(tableParent, "class", execDef.value.attributes.class);

        }
    }
    },


    execute: function(execDef) {

         console.log(" inside execute of command",execDef);
        switch (execDef.command.toLowerCase()) {
            case "tablestyles":
                this.addStyle(execDef);
                break;
        }
    },

    queryState: function(selectionDef, cmd) {
          console.log(" inside queryState of command",selectionDef,cmd);
        var com = CUI.rte.Common;
        var tagName = this._getTagNameForCommand(cmd);
        if (!tagName) {
            return undefined;
        }
        var context = selectionDef.editContext;
        var selection = selectionDef.selection;
        return (com.getTagInPath(context, selection.startNode, tagName) != null);
    }
});

CUI.rte.commands.CommandRegistry.register("tablestyles",  TableStyles.TablestylesCommandImpl);


})();