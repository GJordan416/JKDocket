import {_ as g, E as r, r as d, o as i, c, h as D, w as f, f as o, x as h, T as b} from "./index-c903cc1f.js";
const _ = {
    props: {
        choice: {
            type: String
        },
        startDate: {
            type: String
        },
        endDate: {
            type: String
        },
        offerPastDates: {
            type: Boolean,
            default: !0
        },
        offerFutureDates: {
            type: Boolean,
            default: !1
        },
        required: {
            type: Boolean,
            default: !1
        },
        label: {
            type: String
        },
        labelStart: {
            type: String
        },
        labelEnd: {
            type: String
        },
        inputAttributes: {
            type: Object
        },
        ariaDescribedby: {
            type: String
        },
        keyPrefix: {
            type: String
        }
    },
    computed: {
        items() {
            let e = [];
            return this.offerPastDates && (e.push({
                title: this.$t("global.dateRangePicker.inTheLastDays", [7]),
                value: "-7d"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheLastMonth"),
                value: "-1m"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheLastMonths", [3]),
                value: "-3m"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheLastMonths", [6]),
                value: "-6m"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheLastYear"),
                value: "-1y"
            })),
            this.offerFutureDates && (e.push({
                title: this.$t("global.dateRangePicker.inTheNextDays", [7]),
                value: "7d"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheNextMonth"),
                value: "1m"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheNextMonths", [3]),
                value: "3m"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheNextMonths", [6]),
                value: "6m"
            }),
            e.push({
                title: this.$t("global.dateRangePicker.inTheNextYear"),
                value: "1y"
            })),
            e.push({
                title: this.$t("global.dateRangePicker.customRange"),
                value: this.CONST.DATE_RANGE_OPTION_CUSTOM
            }),
            e
        },
        selectedRange() {
            let e = null;
            return this.choice !== null && this.choice !== this.CONST.DATE_RANGE_OPTION_CUSTOM && (e = this.$t("global.dateRangePicker.effectiveRange", [this.startDate, this.endDate])),
            e
        }
    },
    methods: {
        changeChoice(e) {
            this.$emit("update:choice", e),
            this.updateDates(e)
        },
        changeStartDate(e) {
            this.$emit("update:startDate", e)
        },
        changeEndDate(e) {
            this.$emit("update:endDate", e)
        },
        updateDates(e) {
            let l = null
              , t = null;
            if (e === this.CONST.DATE_RANGE_OPTION_CUSTOM)
                setTimeout( () => {
                    this.$refs.startDate.focus()
                }
                , 400);
            else if (e !== null) {
                let s = e.match(/(-?\d+)([a-z]{1})/)
                  , n = parseInt(s[1])
                  , a = s[2] === "y" ? "years" : s[2] === "m" ? "months" : "days";
                n < 0 ? (l = this.$cove.formatDate(r.local().minus({
                    [a]: Math.abs(n)
                })),
                t = this.$cove.formatDate(r.local())) : (l = this.$cove.formatDate(r.local()),
                t = this.$cove.formatDate(r.local().plus({
                    [a]: n
                })))
            }
            this.changeStartDate(l),
            this.changeEndDate(t)
        }
    }
}
  , y = ["data-custom-range"]
  , T = {
    key: "choice"
}
  , k = {
    key: "custom"
};
function P(e, l, t, s, n, a) {
    const m = d("c-autocomplete")
      , u = d("c-date-picker");
    return i(),
    c("div", {
        "data-custom-range": t.choice === e.CONST.DATE_RANGE_OPTION_CUSTOM ? "true" : "false"
    }, [D(b, {
        name: "scroll-y-transition",
        mode: "out-in"
    }, {
        default: f( () => [t.choice !== e.CONST.DATE_RANGE_OPTION_CUSTOM ? (i(),
        c("div", T, [(i(),
        o(m, h({
            label: t.label,
            items: a.items,
            required: t.required
        }, t.inputAttributes, {
            "model-value": t.choice,
            "hide-details": "auto",
            "persistent-hint": "",
            "onUpdate:modelValue": a.changeChoice,
            hint: a.selectedRange,
            key: `${t.keyPrefix}-choice`,
            "aria-describedby": t.ariaDescribedby
        }), null, 16, ["label", "items", "required", "model-value", "onUpdate:modelValue", "hint", "aria-describedby"]))])) : (i(),
        c("div", k, [(i(),
        o(u, h({
            label: t.labelStart,
            required: t.required,
            ref: "startDate",
            key: `${t.keyPrefix}-startDate`,
            class: "mb-2",
            "onUpdate:modelValue": a.changeStartDate
        }, t.inputAttributes, {
            "model-value": t.startDate
        }), null, 16, ["label", "required", "onUpdate:modelValue", "model-value"])), (i(),
        o(u, h({
            label: t.labelEnd,
            required: t.required,
            key: `${t.keyPrefix}-endDate`,
            "onUpdate:modelValue": a.changeEndDate
        }, t.inputAttributes, {
            "model-value": t.endDate
        }), null, 16, ["label", "required", "onUpdate:modelValue", "model-value"]))]))]),
        _: 1
    })], 8, y)
}
const v = g(_, [["render", P]]);
export {v as D};
