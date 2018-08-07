(function(){

    var CustomStyles = {};




    //******************************CUI.rte.ui.cui.CuiToolbarBuilder*********************************************


    CUI.rte.ui.cui.CuiToolbarBuilder = new Class({

        toString: "CustomStylesCuiToolbarBuilder",

        extend: CUI.rte.ui.cui.CuiToolbarBuilder,

        _getUISettings: function (options) {

       	var uiSettings = this.superClass._getUISettings(options);

        var toolbar = uiSettings["fullscreen"]["toolbar"];
		var popovers = uiSettings["fullscreen"]["popovers"];



        // Font Styles
        if (toolbar.indexOf("#customstyles") == -1) {

        	toolbar.splice(10, 0,"#customstyles");
        }
		if (!popovers.hasOwnProperty("customstyles")) {
            popovers.customstyles = {
            	"ref": "customstyles",
                "items": "customstyles:getStyles:customstyles-pulldown"
            };
        }

        return uiSettings;
    },

        // Styles dropdown builder
    createCustomStyleSelector: function(id, plugin, tooltip, styles) {


        console.log("createtablestylesSelector:::id:::plugin:::tooltip::::styles",id,plugin,tooltip,styles);

        return new  CustomStyles.CustomStylesSelectorImpl(id, plugin, false, tooltip, false,undefined, styles);

    }

    });

//**************************************extend CUI toolkit impl to create instances of extended toolbar builder and dialog manager

     CUI.rte.ui.cui.ToolkitImpl = new Class({

        toString: "customstylesToolkitImpl",

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


    CustomStyles.CustomStylesSelectorImpl = new Class({

        toString: 'CustomStylesSelectorImpl',

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

                  self.plugin.execute('customstyles', style);
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

CustomStyles.CustomStylesPlugin = new Class({

        toString: "CustomStylesPlugin",

        extend: CUI.rte.plugins.Plugin,

    /**
     * @private
     */
     customstylescachedStyles: null,

    /**
     * @private
     */
    customstylesUI: null,

    getFeatures: function() {
      console.log(" inside getFeatures");
        return [ 'customstyles' ];
    },

     reportStyles: function() {
          console.log(" inside reportStyles");
        return [ {
                'type': 'text',
                'customstyles': this.getStyles()
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
        if (!this.customstylescachedStyles) {
            this.customstylescachedStyles = this.config.customstyles || { };

            if (this.customstylescachedStyles) {
                // take styles from config
                com.removeJcrData(this.customstylescachedStyles);
                this.customstylescachedStyles = com.toArray(this.customstylescachedStyles, 'cssName', 'text');

            } else {
                this.customstylescachedStyles = [ ];

            }
        }

        return this.customstylescachedStyles;
    },

    setStyles: function(styles) {

         console.log(" inside setStyles",styles);

        this.customstylescachedStyles = styles;
    },

    hasStylesConfigured: function() {
       console.log(" inside hasStylesConfigured");

        return !!this.config.styles;
    },

    initializeUI: function(tbGenerator, options) {
         //alert("this"+this);
        console.log(" inside initializeUI of plugin:::tbGenerator;;;;;options",tbGenerator,options);
        var plg = CUI.rte.plugins;
        if (this.isFeatureEnabled('customstyles')) {


            console.log(" inside initializeUI this.isFeatureEnabled inside if ");
            this.customstylesUI = new tbGenerator.createCustomStyleSelector('customstyles', this, null,
            this.getStyles());
           tbGenerator.addElement('customstyles', '380', this.customstylesUI, 10);
        }
         tbGenerator.registerIcon('#customstyles', 'textStyle');
    },

	notifyPluginConfig: function(pluginConfig) {
        console.log(" inside notifyPluginConfig of plugin",pluginConfig);

        pluginConfig = pluginConfig || { };
        CUI.rte.Utils.applyDefaults(pluginConfig, { });
        this.config = pluginConfig;

    },

	execute: function (cmdId, styleDef) {

          console.log(" inside execute of plugin",cmdId,styleDef);
      if (!this.customstylesUI) {
        return;
      }
      var cmd = null;

      var className;

        cmd = cmdId.toLowerCase();

        className = ((styleDef !== null && styleDef !== undefined) ? styleDef : this.customstylesUI.getSelectedStyle());

      if (cmd && className) {
        this.editorKernel.relayCmd(cmd, {

          'attributes': {
            'class': className
          }
        });
      }
    },

	updateState: function(selDef) {
       console.log(" inside updateState of plugin",selDef);
        if (!this.customstylesUI) {
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
        this.customstylesUI.selectStyles(actualStyles, selDef);
    }
});

CUI.rte.plugins.PluginRegistry.register("customstyles", CustomStyles.CustomStylesPlugin);


/*********************************************************commandImpl*************************************/

  CustomStyles.CustomStylesCommandImpl = new Class({

    toString: "CustomStylesCommandImpl",
    
    extend: CUI.rte.commands.Command,

    isCommand: function(cmdStr) {
         console.log(" inside isCommand of command",cmdStr);
        return (cmdStr.toLowerCase() == "customstyles");
    },




       getListItems: function(execDef) {

            var context = execDef.editContext;
            return execDef.nodeList.getTags(context, [ {
                "extMatcher": function(dom) {
                    return {
                        "isMatching": CUI.rte.Common.isTag(dom, "p"),
                        "preventRecursionIfMatching": true
                    };
                }
            }
                                                     ], true, true);
        },


    getProcessingOptions: function() {
         console.log(" inside getProcessingOptions of command");
        var cmd = CUI.rte.commands.Command;
        return cmd.PO_SELECTION | cmd.PO_BOOKMARK | cmd.PO_NODELIST;
    },




    execute: function(execDef) {
            var com = CUI.rte.Common;
        var context = execDef.editContext;

        var nodeList = execDef.nodeList;

        var listItems;
        var classname = execDef.value.attributes['class'];

        listItems = this.getListItems(execDef);
        var itemCnt = listItems.length;
        for (var i = 0; i < itemCnt; i++) {
             var item = listItems[i].dom;
            var classValue = com.getAttribute(item,"class", true);
            if(classValue==classname){
            	com.removeAllClasses(item);

            }else{
                     com.setAttribute(item, "class",classname);}
 			}

    }
});

CUI.rte.commands.CommandRegistry.register("customstyles",  CustomStyles.CustomStylesCommandImpl);


})();