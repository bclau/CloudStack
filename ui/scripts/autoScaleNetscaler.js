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
(function($, cloudStack) {
  cloudStack.autoScale = {
    dialog: function(args) {
      return function(args) {
        var success = args.response.success;
        var context = args.context;
        var network = args.context.networks[0];
        var $item = args.$item;

        var lbService = $.grep(network.service, function(service) {
          return service.name == 'Lb';
        })[0];
        
        var stickinessCapabilities = JSON.parse($.grep(
          lbService.capability,
          function(capability) {
            return capability.name == 'SupportedStickinessMethods';
          }
        )[0].value);

        var baseFields = {
          stickyName: { label: 'Sticky Name', validation: { required: true } }
        };

        $.map(
          $.map(
            stickinessCapabilities,
            function(c) { return c.paramlist; }
          ),
          function(p) {
            baseFields[p.paramname] = {
              label: _l('label.sticky.' + p.paramname),
              isHidden: true,
              isBoolean: p.isflag,
              validation: { required: p.required }
            };
          }
        );

        var conditionalFields = {
	 
	   templateCategory: {
                      label: 'Template Catogary',
                      select: function(args) {
                            args.response.success({
                              data: [
                                { catogary: 'all', description: _l('ui.listView.filters.all') },
                                { catogary: 'featured', description: _l('label.featured') },
                                { catogary: 'Community', description: _l('label.menu.community.templates') },
                                { catogary: 'self', description: _l('ui.listView.filters.mine') }
                              ]
                            });
                          }
                    },
           templateNames: {
                      label: 'Template Name',
                      select: function(args) {
                        $.ajax({
                          url: createURL("listTemplates&templatefilter=all" ),
                          dataType: "json",
                          async: true,
                          success: function(json) {
                            var templates = json.listtemplatesresponse.template;
                            args.response.success({
                                data:  $.map(templates, function(template) {
                                return {
                                id: template.id,
                                description: template.name
                              };
                            })
                            });
                          }
                        });
                      }
                    }, 
          serviceOfferingId: {
                      label: 'label.compute.offering',
                      select: function(args) {
                        $.ajax({
                          url: createURL("listServiceOfferings&issystem=false"),
                          dataType: "json",
                          async: true,
                          success: function(json) {
                            var serviceofferings = json.listserviceofferingsresponse.serviceoffering;
                            args.response.success({
				data:  $.map(serviceofferings, function(serviceoffering) {
                                return {
                                id: serviceoffering.id,
                                description: serviceoffering.name
                              };
                            })

			    });
                          }
                        });
                      }
                    },
          minInstance: {
                    label: 'Min. Instance',
                    validation: { required: true }
                  },
	  maxInstance: {
                    label: 'Max. Instance',
                    validation: { required: true }
                  },
	  quietTime: {
                    label: 'Quiet Time (in sec)',
                    validation: { required: true }
                  },
          destroyVMgracePeriod: {
                    label: 'Destroy VM Grace Period',
                    validation: { required: true }
                  },
	  interval: {
                    label: 'Interval (in sec)',
                    validation: { required: true }
                  },
          securityGroups: {
                    label: 'label.menu.security.groups',
		    select: function(args) {
                        $.ajax({
                          url: createURL("listSecurityGroups&listAll=true"),
                          dataType: "json",
                          async: true,
                          success: function(json) {
                            var securitygroups = json.listsecuritygroupsresponse.securitygroup;
                            args.response.success({
                                data:  $.map(securitygroups, function(securitygroup) {
                                return {
                                id: securitygroup.id,
                                description: securitygroup.name
                                };
                                })
                            });
                          }
                        });
                    }
                  },
	  DiskOfferings: {
                    label: 'label.menu.disk.offerings',
                    select: function(args) {
                        $.ajax({
                          url: createURL("listDiskOfferings&listAll=true"),
                          dataType: "json",
                          async: true,
                          success: function(json) {
                            var diskofferings = json.listdiskofferingsresponse.diskoffering;
                            args.response.success({
                                data:  $.map(diskofferings, function(diskoffering) {
                                return {
                                id: diskoffering.id,
                                description: diskoffering.name
                              };
                              })
                            });
                          }
                        });
                    }
                  },
          snmpCommunity: {
                    label: 'SNMP Community',
                    validation: { required: true }
                  },
	  snmpPort: {
                    label: 'SNMP Port',
                    validation: { required: true }
                  },
          autoscaleUsername: {
                    label: 'AutoScale Username',
		    /*select: function(args) {
                        $.ajax({
                          url: createURL("listUsers&domainid=" + args.context.users[0].domainid),
                          dataType: "json",
                          async: true,
                          success: function(json) {
                            var users = json.listusersresponse.user;
                            var items = [];
                            args.response.success({
                                data:  $.map(users, function(user) {
                                return {
                                id: user.id,
                                description: user.username
                              };
                              })
                            });
                          }
                        });
                    }*/

                  }
        };

       var hello = $.extend(conditionalFields, baseFields);

        if (args.data) {
          var populatedFields = $.map(fields, function(field, id) {
            return id;
          });

          $(populatedFields).each(function() {
            var id = this;
            var field = fields[id];
            var dataItem = args.data[id];

            if (field.isBoolean) {
              field.isChecked = dataItem ? true : false;
            } else {
              field.defaultValue = dataItem;
            }
          });
        }

        cloudStack.dialog.createForm({
          form: {
            title: 'AutoScale Configuration Wizard',
            desc: 'Please complete the following fields',
            fields: hello
          },
          after: function(args) {
            // Remove fields not applicable to sticky method
            args.$form.find('.form-item:hidden').remove();
            
            var data = cloudStack.serializeForm(args.$form);

            /* $item indicates that this is an existing sticky rule;
               re-create sticky rule with new parameters */
            if ($item) {
              var $loading = $('<div>').addClass('loading-overlay');

              $loading.prependTo($item);
              cloudStack.lbStickyPolicy.actions.recreate(
                $item.data('multi-custom-data').id,
                $item.data('multi-custom-data').lbRuleID,
                data,
                function() { // Complete
                  $(window).trigger('cloudStack.fullRefresh');
                },
                function(error) { // Error
                  $(window).trigger('cloudStack.fullRefresh');
                }
              );
            } else {
              success({
                data: data
              });
            }
          }
        });
      };
    },

    actions: {
      add: function(lbRuleID, data, complete, error) {
        var stickyURLData = '';
        var stickyParams = $.map(data, function(value, key) {
          return key;
        });

        var notParams = ['methodname', 'stickyName'];

        var index = 0;
        $(stickyParams).each(function() {
          var param = '&param[' + index + ']';
          var name = this.toString();
          var value = data[name];

          if (!value || $.inArray(name, notParams) > -1) return true;
          if (value == 'on') value = true;
          
          stickyURLData += param + '.name=' + name + param + '.value=' + value;

          index++;

          return true;
        });

        $.ajax({
          url: createURL('createLBStickinessPolicy' + stickyURLData),
          data: {
            lbruleid: lbRuleID,
            name: data.stickyName,
            methodname: data.methodname
          },
          success: function(json) {
            cloudStack.ui.notifications.add(
              {
                desc: 'Add new LB sticky rule',
                section: 'Network',
                poll: pollAsyncJobResult,
                _custom: {
                  jobId: json.createLBStickinessPolicy.jobid
                }
              },
              complete, {},
              error, {}
            );
          },
          error: function(json) {
            complete();
            cloudStack.dialog.notice({ message: parseXMLHttpResponse(json) });
          }
        });
      },
      recreate: function(stickyRuleID, lbRuleID, data, complete, error) {
        var addStickyPolicy = function() {
          cloudStack.lbStickyPolicy.actions.add(
            lbRuleID,
            data,
            complete,
            error
          );
        };
        
        // Delete existing rule
        if (stickyRuleID) {
          $.ajax({
            url: createURL('deleteLBStickinessPolicy'),
            data: {
              id: stickyRuleID
            },
            success: function(json) {
              cloudStack.ui.notifications.add(
                {
                  desc: 'Remove previous LB sticky rule',
                  section: 'Network',
                  poll: pollAsyncJobResult,
                  _custom: {
                    jobId: json.deleteLBstickinessrruleresponse.jobid
                  }
                },
                function() {
                  if (data.methodname != 'None') {
                    addStickyPolicy();
                  } else {
                    complete();
                  }
                }, {},
                error, {}
              );
            },
            error: function(json) {
              cloudStack.dialog.notice({
                message: parseXMLHttpResponse(json)
              });
              error();
            }
          });
        } else if (data.methodname != 'None') {
          addStickyPolicy();
        } else {
          complete();
        }
      }
    }
  };
}(jQuery, cloudStack));
