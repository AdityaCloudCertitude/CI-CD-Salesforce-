let definition =
      {"states":[{"fields":[],"conditions":{"id":"state-condition-object","isParent":true,"group":[]},"definedActions":{"actions":[]},"name":"Active","isSmartAction":false,"smartAction":{},"styleObject":{"padding":[{"type":"around","size":"x-small"}],"margin":[{"type":"bottom","size":"x-small"}],"container":{"class":"slds-card"},"size":{"isResponsive":false,"default":"12"},"sizeClass":"slds-size_12-of-12","class":"slds-card slds-p-around_x-small slds-m-bottom_x-small"},"components":{"layer-0":{"children":[{"name":"Block","element":"block","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"label":"Account","collapsible":true,"record":"{record}","collapsedByDefault":false,"card":"{card}"},"type":"block","styleObject":{"padding":[{"type":"around","size":"x-small"}],"class":"slds-p-around_x-small","sizeClass":"slds-size_12-of-12"},"children":[{"name":"FlexCard","element":"childCardPreview","size":{"isResponsive":false,"default":"12"},"stateIndex":0,"class":"slds-col ","property":{"cardName":"ChildCards","recordId":"{recordId}","cardNode":"{records.Contacts.records}","selectedState":"Active","isChildCardTrackingEnabled":true},"type":"element","styleObject":{"sizeClass":"slds-size_12-of-12"},"elementLabel":"FlexCard-0","key":"element_element_block_0_0_childCardPreview_0_0","parentElementKey":"element_block_0_0"}],"elementLabel":"Block-0"}]}},"childCards":["ChildCards"],"actions":[],"omniscripts":[],"documents":[],"blankCardState":true}],"dataSource":{"type":"Query","value":{"dsDelay":"","query":"Select id, Name From Account","resultVar":""},"orderBy":{"name":"","isReverse":""},"contextVariables":[]},"title":"ParentCard","enableLwc":true,"isFlex":true,"theme":"slds","selectableMode":"Multi","lwc":{"DeveloperName":"cfParentCard_1_cloudcertitude","Id":"0RbGA000000krI30AI","MasterLabel":"cfParentCard_1_cloudcertitude","NamespacePrefix":"c","ManageableState":"unmanaged"},"dynamicCanvasWidth":{"type":"tablet_l"},"Id":"0koGA000000oO3hYAE","OmniUiCardKey":"ParentCard/cloudcertitude/1.0","OmniUiCardType":"Parent"};
  export default definition