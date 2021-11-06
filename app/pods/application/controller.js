//ignorei18n_start
import Ember from 'ember';
import CommonUtils from 'emberapp/utils/common-utilities';

export default Ember.Controller.extend({
    startClient: false,
    onInitialLoad: function() {
      this.set("startClient",true);
      Ember.run.scheduleOnce("afterRender",this,function(){
        this.addNotificationStyle();
        this.scrollTopFunction();
        this.bindTooltip();
      });
    }.on('init'),

    willDestroy: function() {
      Ember.$("#ELABody").attr("style","");
      Ember.$("#header-log-search").off('keyup');
    },

    scrollTopFunction: function() {
      Ember.$(window).on("scroll", function() {
        if (Ember.$(this).scrollTop() > 300) {
          Ember.$('#goTop').fadeIn();
        } else {
          Ember.$('#goTop').fadeOut();
        }
      });
    },

    bindTooltip: function() {
      Ember.$("#ELAEmberIncluder").tooltip({
        selector: "[data-showtt='true']",
        container: '#ELAEmberIncluder',
        animation:false
      });
      Ember.$("#ELAEmberIncluder").on("show.bs.modal",function(){
        Ember.$("#ELAEmberIncluder [data-showtt='true']").tooltip("hide");
      });
    },

    addNotificationStyle: function() {
      Ember.$.notify.addStyle("custom_notify", {
        html:
        "<div>" +
            "<div style='margin-left: 25px;margin-right: 15px;'>" +
                "<span class='custom_notification_left'><i class = 'glyphicon glyphicon-remove-sign custom_notification_error'></i></span>"+
                "<span class='custom_notify_container' data-notify-html style='word-break: break-word;'></span>"+
            "</div>" +
        "</div>",
        classes: {
          base: {
            "width": "340px !important",
            "height": "auto",
            "font-size": "13px",
            "color": "#fafafa !important",
            "background-color": "#ff4444",
            "border-radius": "5px",
            "padding": "10px 30px"
          }
        }
      });
      Ember.$.notify.addStyle("success_green", {
          html:
          "<div>" +
              "<div style='margin-left: 25px;margin-right: 15px;'>" +
                  "<span class='custom_notification_left' style='background-color:#dff0d8 !important;'><i class = 'glyphicon glyphicon-remove-sign custom_notification_error'></i></span>"+
                  "<span class='custom_notify_container' data-notify-html style='word-break: break-word;'></span>"+
              "</div>" +
          "</div>",
          classes: {
            base: {
              "width": "340px !important",
              "height": "auto",
              "font-size": "13px",
              "color": "#black !important",
              "background-color": "#dff0d8",
              "border-radius": "5px",
              "padding": "10px 30px"
            }
          }
        });

      Ember.$.notify.defaults({style:"custom_notify",autoHide: true,globalPosition:"top center",showAnimation:"fadeIn",showDuration:120,hideAnimation:"fadeOut",hideDuration:120});
    },


    actions: {
      goToTop: function() {
          Ember.$('html, body').animate({scrollTop : 0},500);
      }
    }

});
//ignorei18n_end
