//ignorei18n_start
import Translator from 'emberapp/utils/i18n-util';
export default Ember.Component.extend({

	tagName:'span',
	GLOBALSERVICE: Ember.inject.service('global-service'),
	textBoxSize:'',
	tempStartDate:'',
	tempEndDate:'',
	tempLabel:'',

	setTimeCB : function() {
		let endtime = moment.unix(this.get("GLOBALSERVICE.endTime")/1000);
		let starttime = moment.unix(this.get("GLOBALSERVICE.startTime")/1000);
		Ember.$(".daterangepicker .calendar.right .daterangepicker_input .calendar-time .hourselect").val(parseInt(endtime.format("HH")));
		Ember.$(".daterangepicker .calendar.right .daterangepicker_input .calendar-time .minuteselect").val(parseInt(endtime.format("mm")));
		Ember.$(".daterangepicker .calendar.left .daterangepicker_input .calendar-time .hourselect").val(parseInt(starttime.format("HH")));
		Ember.$(".daterangepicker .calendar.left .daterangepicker_input .calendar-time .minuteselect").val(parseInt(starttime.format("mm")));
		Ember.$("[name='daterangepicker_end']").val(endtime.format(this.get("GLOBALSERVICE.dateFormat.calendar")));
		Ember.$("[name='daterangepicker_start']").val(starttime.format(this.get("GLOBALSERVICE.dateFormat.calendar")));
		},

	setTimeFilter : function() {
		let filterVal = this.get("GLOBALSERVICE.DATETIMEFILTER");
		Ember.$(".custom-ranges .dr-list-item[value="+filterVal+"]").addClass("active");
	},

	initDatePicker: function () {
 		var self = this;

 		var options = {
 			customScroll:true,
 			autoUpdateInput: false,
      showLastNInput: true,
      alwaysShowCalendars: false,
      showCustomRangeLabel: true,
      timePicker: true
 		};
		options.ranges = {};
		options.ranges[Translator.translate("ember_today")] = [moment().startOf('day').milliseconds(0), moment().endOf('day').milliseconds(0)];
		options.ranges[Translator.translate("ember_yesterday")] = [moment().subtract(1, 'days').startOf('day').milliseconds(0), moment().subtract(1, 'days').endOf('day').milliseconds(0)];
		options.ranges[Translator.translate("ember_last_seven_days")] = [moment().subtract(6, 'days').startOf('day').milliseconds(0), moment().endOf('day').milliseconds(0)];
		options.ranges[Translator.translate("ember_last_thirty_days")] = [moment().subtract(29, 'days').startOf('day').milliseconds(0), moment().endOf('day').milliseconds(0)];
		options.ranges[Translator.translate("ember_this_month")] = [moment().startOf('month').startOf('day').milliseconds(0), moment().endOf('month').endOf('day').milliseconds(0)];
		options.ranges[Translator.translate("ember_last_month")] = [moment().subtract(1, 'month').startOf('month').startOf('day').milliseconds(0), moment().subtract(1, 'month').endOf('month').endOf('day').milliseconds(0)];

 		options.locale = {
 			format: self.get("GLOBALSERVICE.dateFormat.calendar").toString(),
 			separator: " - ",
 			fromLabel: Translator.translate("ember_from"),
 			toLabel: Translator.translate("ember_to"),
 			customRangeLabel: Translator.translate("ember_custom_range"),
			applyLabel: Translator.translate("ember_apply"),
			cancelLabel: Translator.translate("ember_cancel"),
 			daysOfWeek: [
        Translator.translate('ember_sun'),Translator.translate('ember_mon'),Translator.translate('ember_tue'),
        Translator.translate('ember_wed'),Translator.translate('ember_thu'),Translator.translate('ember_fri'),
        Translator.translate('ember_sat')
      ],
 			monthNames: [
				Translator.translate('ember_jan'),Translator.translate('ember_feb'),Translator.translate('ember_march'),
        Translator.translate('ember_apr'),Translator.translate('ember_may'),Translator.translate('ember_june'),
        Translator.translate('ember_jul'),Translator.translate('ember_aug'),Translator.translate('ember_sep'),
        Translator.translate('ember_oct'),Translator.translate('ember_nov'),Translator.translate('ember_dec')
      ],
 			firstDay: 0
 		};

		if(this.get("template")) {
			options.template = this.getTemplate(this.get("template"));
		}

 		var callbackFunction = function(start, end, label) {
 			self.set("tempStartDate",start);
			self.set("tempEndDate",end);
			self.set("tempLabel",label);
 		};

		if(!this.get("custom")) {
			options.startDate = moment.unix(this.get("GLOBALSERVICE.startTime")/1000);
			options.endDate = moment.unix(this.get("GLOBALSERVICE.endTime")/1000);
			options.opens="left";
			options.timePicker24Hour = true;
			options.timePickerSeconds = true;
			options.parentEl = ((this.get("parentEl"))) ? "#"+this.get("parentEl") : "#ELAEmberIncluder";
			if(this.get('disableFutureDates'))
            {
                options.maxDate=new Date();
            }
			this.set("chosenLabel",moment(options.startDate).format(this.get("GLOBALSERVICE.dateFormat.calendar"))+"    "+moment(options.endDate).format(this.get("GLOBALSERVICE.dateFormat.calendar")));

			if(this.get("GLOBALSERVICE.isDemo")){
				Ember.$('#'+this.get('elementId')+'dateRangePicker').css("opacity", "0.4");
			 	Ember.$('#'+this.get('elementId')+'dateRangePicker').click(function(){
						Ember.$.notify(Translator.translate("ember_operation_disabled_in_demo"),{autoHideDelay: 3500});
			 	});
			}else{
				this.$('#'+this.get('elementId')+'dateRangePicker').daterangepicker(options, callbackFunction);

				this.$('#'+this.get('elementId')+'dateRangePicker').on('apply.daterangepicker',function(e){
					if(!Ember.isEmpty(self.get("tempStartDate")) || !Ember.isEmpty(self.get("tempEndDate")) || !Ember.isEmpty(self.get("tempLabel")))
					{
						self.send('dateChosen',self.get("tempStartDate"),self.get("tempEndDate"),self.get("tempLabel"));
					}
				});
				this.$('#'+this.get('elementId')+'dateRangePicker').on('outsideClick.daterangepicker',function(e){

					var oldstart=self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').oldStartDate;
					var oldend=self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').oldEndDate;

					self.set("tempStartDate",oldstart);
					self.set("tempEndDate",oldend);

					oldstart=moment(oldstart).format(self.get("GLOBALSERVICE.dateFormat.calendar"));
					oldend=moment(oldend).format(self.get("GLOBALSERVICE.dateFormat.calendar"));


					self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').setStartDate(oldstart);
					self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').setEndDate(oldend);

				});
			}
		}
		else {
			let isCustomTime = (this.get("customTime") && this.get("customTime.start") && this.get("customTime.end"));
			if(isCustomTime) {
				options.startDate = moment.unix(this.get("customTime.start")/1000);
				options.endDate = moment.unix(this.get("customTime.end")/1000);
			}
			else {
				options.startDate = moment().startOf('day');
				options.endDate = moment().endOf('day');
			}
			options.opens = ((this.get("opens"))) ? this.get("opens") : "left";
			if (this.get("singleDatePicker") != undefined) {
				options.startDate = moment.unix(this.get("customTime.start")/1000);
                options.singleDatePicker = this.get("singleDatePicker");
            }
            if (this.get("showDropdowns") != undefined) {
                options.showDropdowns = this.get("showDropdowns");
            }
            if (this.get("timePicker") != undefined) {
                options.timePicker = this.get("timePicker");
            }
            if (this.get("maxDate") != undefined) {
                options.maxDate = this.get("maxDate");
            }
			options.timePicker24Hour = ((this.get("timePicker24Hour"))) ? this.get("timePicker24Hour") : true;
			options.timePickerSeconds = this.get("timePickerSeconds");
			options.parentEl = ((this.get("parentEl"))) ? "#"+this.get("parentEl") : "#ELAEmberIncluder";
			if(this.get('disableFutureDates'))
            {
                options.maxDate=new Date();
            }
			this.$('#'+this.get('elementId')+'dateRangePicker').daterangepicker(options);

			if(isCustomTime) {
				this.$('#'+this.get('elementId')+'dateRangePicker').val(options.startDate.format(self.get("GLOBALSERVICE.dateFormat.calendar")) + " - " + options.endDate.format(self.get("GLOBALSERVICE.dateFormat.calendar")));
			}
			if (self.get("custom")) {
                if (options.singleDatePicker) {
                    var dateFormat = self.get('dateFormat');
                    Ember.$('#'+this.get('elementId')+'dateRangePicker').val(self.get("customTime.start").format(self.get("GLOBALSERVICE.dateFormat.calendar")));
                }
            }

			this.$('#'+this.get('elementId')+'dateRangePicker').on('outsideClick.daterangepicker',function(e){

				var oldstart=self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').oldStartDate;
				var oldend=self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').oldEndDate;

				oldstart=moment(oldstart).format(self.get("GLOBALSERVICE.dateFormat.calendar"));
				oldend=moment(oldend).format(self.get("GLOBALSERVICE.dateFormat.calendar"));

				self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').setStartDate(oldstart);
				self.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').setEndDate(oldend);

			});

			this.$('#'+this.get('elementId')+'dateRangePicker').on("apply.daterangepicker", function(ev, picker) {
			    if (options.singleDatePicker) {
                    Ember.$(this).val(picker.startDate.format(self.get("GLOBALSERVICE.dateFormat.calendar")));
                } else {
				    Ember.$(this).val(picker.startDate.format(self.get("GLOBALSERVICE.dateFormat.calendar")) + " - " + picker.endDate.format(self.get("GLOBALSERVICE.dateFormat.calendar")));
				}
				if(self.get("custom")) {
					self.set("customTime",{});
					self.set("customTime.start",picker.startDate.unix()*1000);
					self.set("customTime.end",picker.endDate.unix()*1000);
				}
				self.sendAction('changeAction',picker.startDate.unix()*1000, picker.endDate.unix()*1000);
			});

		}
		this.setTimeCB();
		this.setTimeFilter();
		Ember.$(".dr-list-item").on("click",function(event){
			Ember.$(".custom-ranges .dr-list-item").removeClass("active");
			Ember.$(event.target).addClass("active");
			self.sendAction('timeFilterchangeAction',parseInt(Ember.$(event.target).attr("value")));
		//	Ember.$('#'+self.get('elementId')+'dateRangePicker').data('daterangepicker').hide();
		});
 	},

 	onInsertion: function() {
 		this.initDatePicker();
		if(this.get('autoResize')==true)
		{
			this.send('changeWidthSize');
		}
		if(this.get('isAddClass') && this.get('custom'))
		{
			this.send("addClass");
		}
 	}.on('didInsertElement'),

	onDestroying: function() {
		if(typeof Ember.$('#'+this.get('elementId')+'dateRangePicker').data("daterangepicker")  !== "undefined") {
			Ember.$('#'+this.get('elementId')+'dateRangePicker').data("daterangepicker").remove();
		}
		Ember.$(".dr-list-item").off("click");
	}.on("willDestroyElement"),

	getTemplate: function(templateName) {
		let templates = {};
		templates["picker-1"] = '<div class="daterangepicker dropdown-menu '+this.get("templateClass")+' ela-mt-14">' +
 		'<div class="calendar left">' +
			'<div class="daterangepicker_input">' +
				'<input class="input-mini" type="text" name="daterangepicker_start" value="" />' +
				'<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
				'<div class="calendar-time">' +
					'<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
					'<div></div>' +
				'</div>' +
			'</div>' +
			'<div class="calendar-table"></div>' +
 		'</div>' +
 		'<div class="calendar right">' +
			'<div class="daterangepicker_input">' +
				'<input class="input-mini" type="text" name="daterangepicker_end" value="" />' +
				'<i class="fa fa-calendar glyphicon glyphicon-calendar"></i>' +
				'<div class="calendar-time">' +
					'<i class="fa fa-clock-o glyphicon glyphicon-time"></i>' +
					'<div></div>' +
				'</div>' +
			'</div>' +
			'<div class="calendar-table"></div>' +
 		'</div>' +
 		'<div class="ranges">';
			if(this.get("isTimeFilterAvailable")){
				templates["picker-1"] +=
				'<div class="custom-ranges">'+
					'<div class="dr-list">'+
						'<div class="dr-list-item" value="0" >'+Translator.translate('ember_all_hours')+'</div>'+
						'<div class="dr-list-item" value="1" >'+Translator.translate('ember_business_hours')+'</div>'+
						'<div class="dr-list-item" value="2" >'+Translator.translate('ember_non_business_houres')+'</div>'+
					'</div>'+
				'</div>';
			}
			templates["picker-1"] +=
			'<div class="range_inputs">' +
				'<button class="applyBtn" disabled="disabled" type="button"></button> ' +
				'<button class="cancelBtn" type="button"></button>' +
			'</div>' +
		'</div>';
		return templates[templateName];
	},

 	actions : {

 		dateChosen : function(start,end,label) {
			let self=this;
			let startUnix,endUnix;
			var dateFormat=self.get("GLOBALSERVICE.dateFormat.calendar").toString();
			start = moment(start).format(dateFormat.toString());
			end = moment(end).format(dateFormat.toString());
			this.set("chosenLabel",start+"    "+end);

			if(dateFormat.indexOf("ss")>=0)
			{
				startUnix = moment(start,dateFormat).unix()*1000;
				endUnix = moment(end, dateFormat).unix()*1000;
			}
			else
			{
				startUnix = moment(start,dateFormat).second(0).millisecond(0).unix()*1000;
				endUnix = moment(end, dateFormat).second(59).millisecond(999).unix()*1000;
			}

			this.get("GLOBALSERVICE").storeDate(startUnix, endUnix,start,end).then(function(json) {
				start = moment.unix(parseInt(json.START_TIME/1000));
				end = moment.unix(parseInt(json.END_TIME/1000));
				self.set("chosenLabel",start.format(dateFormat)+"    "+end.format(dateFormat));
				self.sendAction('changeAction',start.format(self.get("GLOBALSERVICE.dateFormat.cal_internal")), end.format(self.get("GLOBALSERVICE.dateFormat.cal_internal")), label);
			});
 		},

 		iconClicked : function() {
 			Ember.$('#'+this.get('elementId')+'dateRangePicker').click();
			this.setTimeCB();
 		},

		setSelectors: function() {
			this.setTimeCB();
		},

		changeWidthSize: function(){
			var length=this.get("chosenLabel").length;
			var textPixel=(290/44)*length;
			var calendarPixel=textPixel+40;
			Ember.$('.auto-date-width').css('width',textPixel+'px');
			Ember.$('.auto-date-width').parent().css('width',calendarPixel+'px');
		},
		addClass: function()
		{
			Ember.$('.daterangepicker.dropdown-menu.single').addClass(this.get("addClassNames"));
		}

 	}

});
//ignorei18n_end
