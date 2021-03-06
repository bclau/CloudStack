// Copyright 2012 Citrix Systems, Inc. Licensed under the
// Apache License, Version 2.0 (the "License"); you may not use this
// file except in compliance with the License.  Citrix Systems, Inc.
// reserves all rights not expressly granted by the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 
// Automatically generated by addcopyright.py at 04/03/2012
package com.cloud.agent.api.routing;

import com.cloud.agent.api.to.LoadBalancerTO;

/**
 * LoadBalancerConfigCommand sends the load balancer configuration
 */
public class LoadBalancerConfigCommand extends NetworkElementCommand {
    LoadBalancerTO[] loadBalancers;
    public String lbStatsVisibility = "guest-network";
    public String lbStatsPublicIP; /* load balancer listen on this ips for stats */
    public String lbStatsPrivateIP; /* load balancer listen on this ips for stats */
    public String lbStatsGuestIP; /* load balancer listen on this ips for stats */
    public String lbStatsPort = "8081"; /*load balancer listen on this port for stats */
    public String lbStatsSrcCidrs = "0/0" ; /* TODO : currently there is no filtering based on the source ip */
    public String lbStatsAuth = "admin1:AdMiN123";
    public String lbStatsUri = "/admin?stats";  
    
    protected LoadBalancerConfigCommand() {
    }
    
    public LoadBalancerConfigCommand(LoadBalancerTO[] loadBalancers) {
    	this.loadBalancers = loadBalancers;
    }

    public LoadBalancerConfigCommand(LoadBalancerTO[] loadBalancers,String PublicIp,String GuestIp,String PrivateIp) {
    	this.loadBalancers = loadBalancers;
    	this.lbStatsPublicIP = PublicIp;
    	this.lbStatsPrivateIP = PrivateIp;
    	this.lbStatsGuestIP = GuestIp;
    }
    
   
	public LoadBalancerTO[] getLoadBalancers() {
        return loadBalancers;
    }
}
