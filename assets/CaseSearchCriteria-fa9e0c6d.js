import {_ as O, b as I, d as u, e as h, r as c, o, c as D, h as s, w as i, f as m, j as p, T as V} from "./index-c903cc1f.js";
import {D as k} from "./DateRangePicker-cb490bb1.js";
import {F as S} from "./FieldDescription-c5e8cc53.js";
import {S as v} from "./searchCriteria-ac611622.js";
import "./search-50600abe.js";
import "./index-d38d639c.js";
const g = I()
  , N = {
    components: {
        DateRangePicker: k,
        FieldDescription: S
    },
    mixins: [v],
    data() {
        return {
            categories: [],
            caseTypes: [],
            caseSubTypes: []
        }
    },
    computed: {
        caseLocations() {
            return g.getCaseLocationsByCourt(this.searchDTO.courtID)
        },
        isSingleCaseLocationMode() {
            return g.isSingleCaseLocationMode
        }
    },
    watch: {
        "searchDTO.courtID": {
            immediate: !0,
            handler(e) {
                u.isNil(e) ? this.categories = [] : h.get(this.$cove.getAPI({
                    name: "api.court.case.categories",
                    params: {
                        courtID: e
                    }
                })).then(a => {
                    this.categories = u.defaultTo(a.data, [])
                }
                )
            }
        },
        "searchDTO.case.caseCategoryID": {
            immediate: !0,
            handler(e) {
                u.isNil(e) ? this.caseTypes = [] : h.get(this.$cove.getAPI({
                    name: "api.court.case.types",
                    params: {
                        courtID: this.searchDTO.courtID
                    },
                    query: {
                        caseCategoryID: e
                    }
                })).then(a => {
                    this.caseTypes = u.defaultTo(a.data, [])
                }
                )
            }
        },
        "searchDTO.case.caseTypeID": {
            immediate: !0,
            handler(e) {
                u.isNil(e) ? this.caseSubTypes = [] : h.get(this.$cove.getAPI({
                    name: "api.court.case.subtypes",
                    params: {
                        courtID: this.searchDTO.courtID
                    },
                    query: {
                        caseCategoryID: this.searchDTO.case.caseCategoryID,
                        caseTypeID: e
                    }
                })).then(a => {
                    this.caseSubTypes = u.defaultTo(a.data, [])
                }
                )
            }
        },
        "searchDTO.advanced"(e) {
            e && this.searchDTO.case.caseTitle === null && (this.searchDTO.case.caseTitleQueryTypeID = this.getDefaultQueryType(!0))
        }
    },
    methods: {
        changeCourt() {
            this.searchDTO.case.locationID = null,
            this.searchDTO.case.caseCategoryID = null,
            this.changeCategory()
        },
        changeCategory() {
            this.searchDTO.case.caseTypeID = null,
            this.changeType()
        },
        changeType() {
            this.searchDTO.case.caseSubTypeID = null
        }
    }
};
function U(e, a, $, F, b, n) {
    const d = c("c-autocomplete")
      , l = c("field-description")
      , r = c("v-col")
      , f = c("c-text-field")
      , T = c("date-range-picker")
      , y = c("c-checkbox")
      , C = c("v-row");
    return o(),
    D("div", null, [s(V, {
        name: "scroll-y-transition",
        mode: "out-in"
    }, {
        default: i( () => [(o(),
        D("form", {
            key: e.searchDTO.advanced
        }, [s(C, {
            "no-gutters": "",
            class: "mt-4"
        }, {
            default: i( () => [e.isSingleCourtMode ? p("", !0) : (o(),
            m(r, {
                key: 0,
                cols: "12"
            }, {
                default: i( () => [s(d, {
                    items: e.courts,
                    modelValue: e.searchDTO.courtID,
                    "onUpdate:modelValue": [a[0] || (a[0] = t => e.searchDTO.courtID = t), n.changeCourt],
                    "item-title": "displayName",
                    "item-value": "resourceID",
                    label: e.$t("page.searchCriteria.case.field.court"),
                    outlined: "",
                    key: "courtID",
                    "hide-details": "auto",
                    "aria-describedby": "adf6e5a4-b099-4b21-8a92-572059ce793a"
                }, null, 8, ["items", "modelValue", "label", "onUpdate:modelValue"]), s(l, {
                    id: "adf6e5a4-b099-4b21-8a92-572059ce793a",
                    "message-key": "page.searchCriteria.case.field.court.description"
                })]),
                _: 1
            })), n.isSingleCaseLocationMode ? p("", !0) : (o(),
            m(r, {
                key: 1,
                cols: "12"
            }, {
                default: i( () => [s(d, {
                    modelValue: e.searchDTO.case.locationID,
                    "onUpdate:modelValue": a[1] || (a[1] = t => e.searchDTO.case.locationID = t),
                    items: n.caseLocations,
                    "item-title": "locationName",
                    "item-value": "locationID",
                    label: e.$t("page.searchCriteria.case.field.location"),
                    "no-data-text": e.$t("global.courtFirst"),
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "ab3ed0b5-d93e-4428-8dcc-522f77c9e6c8"
                }, null, 8, ["modelValue", "items", "label", "no-data-text"]), s(l, {
                    id: "ab3ed0b5-d93e-4428-8dcc-522f77c9e6c8",
                    "message-key": "page.searchCriteria.case.field.location.description"
                })]),
                _: 1
            })), s(r, {
                cols: "12"
            }, {
                default: i( () => [s(f, {
                    modelValue: e.searchDTO.case.caseNumber,
                    "onUpdate:modelValue": a[2] || (a[2] = t => e.searchDTO.case.caseNumber = t),
                    label: e.$t("page.searchCriteria.case.field.caseNumber"),
                    maxlength: "250",
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "ac5ce72e-e17f-447a-9697-f9a7bd172b2a"
                }, null, 8, ["modelValue", "label"]), s(l, {
                    id: "ac5ce72e-e17f-447a-9697-f9a7bd172b2a",
                    "message-key": "page.searchCriteria.case.field.caseNumber.description"
                })]),
                _: 1
            }), s(r, {
                cols: "12"
            }, {
                default: i( () => [s(f, {
                    modelValue: e.searchDTO.case.caseTitle,
                    "onUpdate:modelValue": a[3] || (a[3] = t => e.searchDTO.case.caseTitle = t),
                    label: e.$t("page.searchCriteria.case.field.caseTitle"),
                    maxlength: "250",
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "a575f370-e512-47a7-a3e0-e24d1adfc836"
                }, null, 8, ["modelValue", "label"]), s(l, {
                    id: "a575f370-e512-47a7-a3e0-e24d1adfc836",
                    "message-key": "page.searchCriteria.case.field.caseTitle.description"
                })]),
                _: 1
            }), e.searchDTO.advanced ? (o(),
            m(r, {
                key: 2,
                cols: "12"
            }, {
                default: i( () => [s(d, {
                    modelValue: e.searchDTO.case.caseTitleQueryTypeID,
                    "onUpdate:modelValue": a[4] || (a[4] = t => e.searchDTO.case.caseTitleQueryTypeID = t),
                    label: e.$t("page.searchCriteria.case.field.caseTitleSearchType"),
                    items: e.queryTypes,
                    outlined: "",
                    class: "ml-8",
                    clearable: !1,
                    "hide-details": "auto",
                    "aria-describedby": "a6b94c73-6561-424b-835f-88e8465eff15"
                }, null, 8, ["modelValue", "label", "items"]), s(l, {
                    id: "a6b94c73-6561-424b-835f-88e8465eff15",
                    class: "ml-8",
                    "message-key": "global.queryType.description"
                })]),
                _: 1
            })) : p("", !0), s(r, {
                cols: "12"
            }, {
                default: i( () => [s(d, {
                    modelValue: e.searchDTO.case.caseCategoryID,
                    "onUpdate:modelValue": [a[5] || (a[5] = t => e.searchDTO.case.caseCategoryID = t), n.changeCategory],
                    items: b.categories,
                    "item-title": "caseCategoryName",
                    "item-value": "caseCategoryID",
                    label: e.$t("page.searchCriteria.case.field.caseCategory"),
                    "no-data-text": e.$t("global.courtFirst"),
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "a8865f7f-cc2a-4adc-b6bf-b3b62a423397"
                }, null, 8, ["modelValue", "items", "label", "no-data-text", "onUpdate:modelValue"]), s(l, {
                    id: "a8865f7f-cc2a-4adc-b6bf-b3b62a423397",
                    "message-key": "page.searchCriteria.case.field.caseCategory.description"
                })]),
                _: 1
            }), e.searchDTO.advanced ? (o(),
            m(r, {
                key: 3,
                cols: "12"
            }, {
                default: i( () => [s(d, {
                    modelValue: e.searchDTO.case.caseTypeID,
                    "onUpdate:modelValue": [a[6] || (a[6] = t => e.searchDTO.case.caseTypeID = t), n.changeType],
                    items: b.caseTypes,
                    "item-title": "caseTypeName",
                    "item-value": "caseTypeID",
                    label: e.$t("page.searchCriteria.case.field.caseType"),
                    "no-data-text": e.$t("global.caseCategoryFirst"),
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "f967a6f5-c041-4f23-9085-1c53a047f03b"
                }, null, 8, ["modelValue", "items", "label", "no-data-text", "onUpdate:modelValue"]), s(l, {
                    id: "f967a6f5-c041-4f23-9085-1c53a047f03b",
                    "message-key": "page.searchCriteria.case.field.caseType.description"
                })]),
                _: 1
            })) : p("", !0), e.searchDTO.advanced ? (o(),
            m(r, {
                key: 4,
                cols: "12"
            }, {
                default: i( () => [s(d, {
                    modelValue: e.searchDTO.case.caseSubTypeID,
                    "onUpdate:modelValue": a[7] || (a[7] = t => e.searchDTO.case.caseSubTypeID = t),
                    items: b.caseSubTypes,
                    "item-title": "caseSubTypeName",
                    "item-value": "caseSubTypeID",
                    label: e.$t("page.searchCriteria.case.field.caseSubType"),
                    "no-data-text": e.$t("global.caseTypeFirst"),
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "a1a16df1-454c-4527-8f44-446902570413"
                }, null, 8, ["modelValue", "items", "label", "no-data-text"]), s(l, {
                    id: "a1a16df1-454c-4527-8f44-446902570413",
                    "message-key": "page.searchCriteria.case.field.caseSubType.description"
                })]),
                _: 1
            })) : p("", !0), s(r, {
                cols: "12"
            }, {
                default: i( () => [s(T, {
                    label: e.$t("page.searchCriteria.case.field.caseFiledDate"),
                    labelStart: e.$t("page.searchCriteria.case.field.caseFiledDateFrom"),
                    labelEnd: e.$t("page.searchCriteria.case.field.caseFiledDateTo"),
                    keyPrefix: "caseFiledDate",
                    inputAttributes: {
                        outlined: !0
                    },
                    choice: e.searchDTO.case.filedDateChoice,
                    "onUpdate:choice": a[8] || (a[8] = t => e.searchDTO.case.filedDateChoice = t),
                    startDate: e.searchDTO.case.filedDateStart,
                    "onUpdate:startDate": a[9] || (a[9] = t => e.searchDTO.case.filedDateStart = t),
                    endDate: e.searchDTO.case.filedDateEnd,
                    "onUpdate:endDate": a[10] || (a[10] = t => e.searchDTO.case.filedDateEnd = t),
                    "aria-describedby": "a0d83c01-f8af-4a3d-8c79-5256302150d2"
                }, null, 8, ["label", "labelStart", "labelEnd", "choice", "startDate", "endDate"]), s(l, {
                    id: "a0d83c01-f8af-4a3d-8c79-5256302150d2",
                    "message-key": "page.searchCriteria.case.field.caseFiledDate.description"
                })]),
                _: 1
            }), s(r, {
                cols: "12"
            }, {
                default: i( () => [s(f, {
                    label: e.$t("page.searchCriteria.case.field.originatingCaseNumber"),
                    modelValue: e.searchDTO.case.originatingCourtCaseNumber,
                    "onUpdate:modelValue": a[11] || (a[11] = t => e.searchDTO.case.originatingCourtCaseNumber = t),
                    maxlength: "50",
                    outlined: "",
                    "hide-details": "auto",
                    "aria-describedby": "817b8757-1ce0-4179-a020-db83b8097432"
                }, null, 8, ["label", "modelValue"]), s(l, {
                    id: "817b8757-1ce0-4179-a020-db83b8097432",
                    "message-key": "page.searchCriteria.case.field.originatingCourtCaseNumber.description"
                })]),
                _: 1
            }), s(r, {
                cols: "12"
            }, {
                default: i( () => [s(y, {
                    label: e.$t("page.searchCriteria.case.field.excludeClosed"),
                    modelValue: e.searchDTO.case.excludeClosed,
                    "onUpdate:modelValue": a[12] || (a[12] = t => e.searchDTO.case.excludeClosed = t),
                    class: "mt-0",
                    "hide-details": "auto",
                    "aria-describedby": "a0549454-b002-4539-a236-7a31504991a9"
                }, null, 8, ["label", "modelValue"]), s(l, {
                    id: "a0549454-b002-4539-a236-7a31504991a9",
                    "message-key": "page.searchCriteria.case.field.excludeClosed.description"
                })]),
                _: 1
            })]),
            _: 1
        })]))]),
        _: 1
    })])
}
const B = O(N, [["render", U]]);
export {B as default};
