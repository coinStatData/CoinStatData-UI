import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import "./tabNav.css"

function StatTabNav({ imageSrc, portResp }) {

  return (
    <>
      <div className="port-tab-nav-cont">
        <Tabs defaultActiveKey="Graph" id="port-tabs" className="mb-3">
          <Tab eventKey="Graph" title="Graph">
            <div className="">
              <img src={imageSrc} />
            </div>
          </Tab>
          <Tab eventKey="Statistic" title="Statistic">
            <div className="port-stat-box">
              <div className="stat-box-col-1">
                <strong>Optimal Portfolio Ratio</strong>
                <br />
                <ul>
                  {portResp['optimal-portfolio'] && 
                    Object.keys(portResp['optimal-portfolio']).map((key) => {
                      return (
                        <li key={key}>
                          {key}: {portResp['optimal-portfolio'][key]}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="stat-box-col-2">
                <strong>Maximum Performance</strong>
                <br />
                <ul>
                  {portResp['maximum-perf'] && 
                    Object.keys(portResp['maximum-perf']).map((key) => {
                      return (
                        <li key={key}>
                          {key}: {portResp['maximum-perf'][key]}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>

            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default StatTabNav;

