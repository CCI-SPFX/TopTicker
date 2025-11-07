
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneTextField,
  PropertyPaneToggle,
  IPropertyPaneField
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base"; 

import Ticker from "./components/Ticker";
// import { ITickerProps } from "./components/ITickerProps";

export interface ITickerWebPartProps {
  tickerCount: number;
  showIcon: boolean;
  title: string;
  iconUrl: string;
  iconSize: string;
  titleSize: string;
  titleColor: string;
  titleBGColor: string;
  tickersTextSize: string;
  tickersTextColor: string;
  tickersBGColor: string;
  animationSpeed: string;
}

export default class TickerWebPart extends BaseClientSideWebPart<ITickerWebPartProps> {
  public render(): void {
    const items = this._getTickerList();

    const element: React.ReactElement = React.createElement(
      Ticker,
      {
        tickersList: items,
        tickerTitleIcon: this.properties.showIcon,
        titleIconUrl: this.properties.iconUrl,
        titleIconSize: this.properties.iconSize,
        tickerTitle: this.properties.title,
        tickerTitleSize: this.properties.titleSize,
        tickerTitleColor: this.properties.titleColor,
        tickerTitleBGColor: this.properties.titleBGColor,
        tickersTextSize: this.properties.tickersTextSize,
        tickersTextColor: this.properties.tickersTextColor,
        tickersBGColor: this.properties.tickersBGColor,
        tickerAnimationSpeed: this.properties.animationSpeed,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

protected onInit(): Promise<void> {
  this.properties.tickerCount = this.properties.tickerCount || 1;
  return Promise.resolve();
}



  /** Collect ticker items into array */
  private _getTickerList(): string[] {
    const items: string[] = [];
    const count = Math.min(this.properties.tickerCount || 0, 7); // max 7
    for (let i = 0; i < count; i++) {
      const value = (this.properties as any)[`tickerItem_${i}`];
      if (value) items.push(value);
    }
    return items;
  }

  /** Add one more ticker field */
  private _addNewTicker(): void { 
    this.properties.tickerCount = (this.properties.tickerCount || 0) + 1;
    this.context.propertyPane.refresh();
    this.render();
  }

  private _removeLastTicker(): void { 
    this.properties.tickerCount = this.properties.tickerCount - 1;
    this.context.propertyPane.refresh();
    this.render();
  }  



  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const tickerFields: IPropertyPaneField<any>[] = [];

    for (let i = 0; i < (this.properties.tickerCount || 0); i++) {
      tickerFields.push(
        PropertyPaneTextField(`tickerItem_${i}`, {
          // label: `Ticker Text ${i + 1}`
        })
      );
    }
if ((this.properties.tickerCount || 0) < 7) {
    tickerFields.push(
      PropertyPaneButton("addTicker", {
        text: "➕ Add",
        buttonType: PropertyPaneButtonType.Normal,
        onClick: () => this._addNewTicker()
      })
    );
  }
if ((this.properties.tickerCount || 0) > 1) {
    tickerFields.push(
  PropertyPaneButton("removeTicker", {
    text: "❌ Remove",
    buttonType: PropertyPaneButtonType.Normal,
    onClick: () => this._removeLastTicker()
  })
);
}

    return {
      pages: [
        {
          groups: [ 
            {
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title Text"
                })
              ]
            },
            {
              // groupName: "Ticker Items",
              groupFields: tickerFields
            },
            {
              groupFields: [
                PropertyPaneToggle("showIcon", {
                  label: "Title Icon",
                  onText: "Show",
                  offText: "Hide",
                  checked: true
                }),
                ...(this.properties.showIcon
                  ? [
                      PropertyPaneTextField("iconUrl", {
                        label: "Icon URL"
                      }),
                      PropertyPaneTextField("iconSize", {
                        label: "Icon Size"
                      })
                    ]
                  : []),
                PropertyPaneTextField("animationSpeed", {
                  label: "Animation Speed (in Seconds)"
                })
              ]
            },
            {
              groupName: "Title Styles",
              groupFields: [
                PropertyPaneTextField("titleSize", {
                  label: "Title Text Size"
                }),
                PropertyPaneTextField("titleColor", {
                  label: "Title Color"
                }),
                PropertyPaneTextField("titleBGColor", {
                  label: "Title Background Color"
                })
              ]
            },
            {
              groupName: "Tickers Styles",
              groupFields: [
                PropertyPaneTextField("tickersTextSize", {
                  label: "Tickers Text Size"
                }),
                PropertyPaneTextField("tickersTextColor", {
                  label: "Tickers Text Color"
                }),
                PropertyPaneTextField("tickersBGColor", {
                  label: "Tickers Background Color"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
