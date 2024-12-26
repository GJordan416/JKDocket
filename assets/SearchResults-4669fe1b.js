import {_ as B, d as n, X as y, e as N, r as l, o as h, f as d, w as c, h as a, A as E, a as i, i as g, t as _, T as j, j as R, Y as e} from "./index-c903cc1f.js";
import {_ as O} from "./dynamic-import-helper-be004503.js";
import {P as q} from "./PageWrapper-103d8b92.js";
import {V as H} from "./ValidationErrorPanel-b4affc40.js";
import {F as U} from "./FieldDescription-c5e8cc53.js";
import {S as p} from "./search-50600abe.js";
import {P as F} from "./page-85c69124.js";
import "./index-d38d639c.js";
const J = {
    components: {
        PageWrapper: q,
        ValidationErrorPanel: H,
        FieldDescription: U
    },
    mixins: [F],
    props: {
        searchType: {
            type: String
        }
    },
    data() {
        return {
            searchDTO: null,
            backupSearchDTO: null,
            internalSortBy: null,
            internalSortDesc: null,
            results: [],
            drawer: !1,
            loading: !1
        }
    },
    computed: {
        headers() {
            return p.getSearchResultHeaders(this.searchType)
        },
        supportsAdvancedSearch() {
            return p.getSupportedAdvancedSearchTypes().includes(this.searchType)
        },
        sortableColumns() {
            let r = n.filter(this.headers, {
                sortable: !0
            });
            return r = r.concat(p.getAdditionalSorts(this.searchType)),
            n.orderBy(r, "text")
        },
        showSortDirections() {
            let r = n.find(this.sortableColumns, {
                value: this.internalSortBy
            });
            return !n.isNil(r) && !r.customSort
        },
        searchCriteriaComponent() {
            let r = n.upperFirst(this.searchType) + "SearchCriteria";
            return y( () => O(Object.assign({
                "../support/search/CalendarSearchCriteria.vue": () => e( () => import("./CalendarSearchCriteria-42d82ac2.js"), ["assets/CalendarSearchCriteria-42d82ac2.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/FieldDescription-c5e8cc53.js", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/CalendarSearchResults.vue": () => e( () => import("./CalendarSearchResults-808613aa.js"), ["assets/CalendarSearchResults-808613aa.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/HearingsPopup-dee6a778.js"]),
                "../support/search/CaseSearchCriteria.vue": () => e( () => import("./CaseSearchCriteria-fa9e0c6d.js"), ["assets/CaseSearchCriteria-fa9e0c6d.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/DateRangePicker-cb490bb1.js", "assets/FieldDescription-c5e8cc53.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/CaseSearchResults.vue": () => e( () => import("./CaseSearchResults-74c8927c.js"), ["assets/CaseSearchResults-74c8927c.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/CitationSearchCriteria.vue": () => e( () => import("./CitationSearchCriteria-ee7fc890.js"), ["assets/CitationSearchCriteria-ee7fc890.js", "assets/SectionSeparator-3613031d.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/FieldDescription-c5e8cc53.js", "assets/DateRangePicker-cb490bb1.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/CitationSearchResults.vue": () => e( () => import("./CitationSearchResults-68d44894.js"), ["assets/CitationSearchResults-68d44894.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/DocumentSearchCriteria.vue": () => e( () => import("./DocumentSearchCriteria-18beda4b.js"), ["assets/DocumentSearchCriteria-18beda4b.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/FieldDescription-c5e8cc53.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/DocumentSearchResults.vue": () => e( () => import("./DocumentSearchResults-b4492bb9.js"), ["assets/DocumentSearchResults-b4492bb9.js", "assets/DocumentPopup-81de36b1.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/ValidationErrorPanel-b4affc40.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js"]),
                "../support/search/HearingsPopup.vue": () => e( () => import("./HearingsPopup-dee6a778.js"), ["assets/HearingsPopup-dee6a778.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/JudgmentSearchCriteria.vue": () => e( () => import("./JudgmentSearchCriteria-3e2a55a0.js"), ["assets/JudgmentSearchCriteria-3e2a55a0.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/FieldDescription-c5e8cc53.js", "assets/DateRangePicker-cb490bb1.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/JudgmentSearchResults.vue": () => e( () => import("./JudgmentSearchResults-79e90a50.js"), ["assets/JudgmentSearchResults-79e90a50.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/NestedCaseSearchCriteria.vue": () => e( () => import("./NestedCaseSearchCriteria-35411098.js"), ["assets/NestedCaseSearchCriteria-35411098.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/DateRangePicker-cb490bb1.js", "assets/FieldDescription-c5e8cc53.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/PartySearchCriteria.vue": () => e( () => import("./PartySearchCriteria-7cd737a3.js"), ["assets/PartySearchCriteria-7cd737a3.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/FieldDescription-c5e8cc53.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js", "assets/RenderAddress-2c79307c.js"]),
                "../support/search/PartySearchResults.vue": () => e( () => import("./PartySearchResults-edf987be.js"), ["assets/PartySearchResults-edf987be.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/PublicationSearchCriteria.vue": () => e( () => import("./PublicationSearchCriteria-6db3f4fa.js"), ["assets/PublicationSearchCriteria-6db3f4fa.js", "assets/FieldDescription-c5e8cc53.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/PublicationSearchResults.vue": () => e( () => import("./PublicationSearchResults-1195008c.js"), ["assets/PublicationSearchResults-1195008c.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"])
            }), `../support/search/${r}.vue`))
        },
        searchResultsComponent() {
            let r = n.upperFirst(this.searchType) + "SearchResults";
            return y( () => O(Object.assign({
                "../support/search/CalendarSearchCriteria.vue": () => e( () => import("./CalendarSearchCriteria-42d82ac2.js"), ["assets/CalendarSearchCriteria-42d82ac2.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/FieldDescription-c5e8cc53.js", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/CalendarSearchResults.vue": () => e( () => import("./CalendarSearchResults-808613aa.js"), ["assets/CalendarSearchResults-808613aa.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/HearingsPopup-dee6a778.js"]),
                "../support/search/CaseSearchCriteria.vue": () => e( () => import("./CaseSearchCriteria-fa9e0c6d.js"), ["assets/CaseSearchCriteria-fa9e0c6d.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/DateRangePicker-cb490bb1.js", "assets/FieldDescription-c5e8cc53.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/CaseSearchResults.vue": () => e( () => import("./CaseSearchResults-74c8927c.js"), ["assets/CaseSearchResults-74c8927c.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/CitationSearchCriteria.vue": () => e( () => import("./CitationSearchCriteria-ee7fc890.js"), ["assets/CitationSearchCriteria-ee7fc890.js", "assets/SectionSeparator-3613031d.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/FieldDescription-c5e8cc53.js", "assets/DateRangePicker-cb490bb1.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/CitationSearchResults.vue": () => e( () => import("./CitationSearchResults-68d44894.js"), ["assets/CitationSearchResults-68d44894.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/DocumentSearchCriteria.vue": () => e( () => import("./DocumentSearchCriteria-18beda4b.js"), ["assets/DocumentSearchCriteria-18beda4b.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/FieldDescription-c5e8cc53.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/DocumentSearchResults.vue": () => e( () => import("./DocumentSearchResults-b4492bb9.js"), ["assets/DocumentSearchResults-b4492bb9.js", "assets/DocumentPopup-81de36b1.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/ValidationErrorPanel-b4affc40.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js"]),
                "../support/search/HearingsPopup.vue": () => e( () => import("./HearingsPopup-dee6a778.js"), ["assets/HearingsPopup-dee6a778.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/JudgmentSearchCriteria.vue": () => e( () => import("./JudgmentSearchCriteria-3e2a55a0.js"), ["assets/JudgmentSearchCriteria-3e2a55a0.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/FieldDescription-c5e8cc53.js", "assets/DateRangePicker-cb490bb1.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/JudgmentSearchResults.vue": () => e( () => import("./JudgmentSearchResults-79e90a50.js"), ["assets/JudgmentSearchResults-79e90a50.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/NestedCaseSearchCriteria.vue": () => e( () => import("./NestedCaseSearchCriteria-35411098.js"), ["assets/NestedCaseSearchCriteria-35411098.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/DateRangePicker-cb490bb1.js", "assets/FieldDescription-c5e8cc53.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/PartySearchCriteria.vue": () => e( () => import("./PartySearchCriteria-7cd737a3.js"), ["assets/PartySearchCriteria-7cd737a3.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/SectionSeparator-3613031d.js", "assets/FieldDescription-c5e8cc53.js", "assets/NestedCaseSearchCriteria-35411098.js", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js", "assets/RenderAddress-2c79307c.js"]),
                "../support/search/PartySearchResults.vue": () => e( () => import("./PartySearchResults-edf987be.js"), ["assets/PartySearchResults-edf987be.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"]),
                "../support/search/PublicationSearchCriteria.vue": () => e( () => import("./PublicationSearchCriteria-6db3f4fa.js"), ["assets/PublicationSearchCriteria-6db3f4fa.js", "assets/FieldDescription-c5e8cc53.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css", "assets/DateRangePicker-cb490bb1.js", "assets/searchCriteria-ac611622.js", "assets/search-50600abe.js", "assets/index-d38d639c.js"]),
                "../support/search/PublicationSearchResults.vue": () => e( () => import("./PublicationSearchResults-1195008c.js"), ["assets/PublicationSearchResults-1195008c.js", "assets/searchResults-913f2181.js", "assets/ResultsOverflowWarning-a4ac03f6.js", "assets/index-c903cc1f.js", "assets/index-517c015c.css"])
            }), `../support/search/${r}.vue`))
        }
    },
    watch: {
        drawer(r) {
            r ? (this.internalSortBy = this.searchDTO.paging.sortBy,
            this.internalSortDesc = this.searchDTO.paging.sortDesc,
            this.backupSearchDTO = n.cloneDeep(this.searchDTO),
            setTimeout( () => {
                document.querySelector(".js-filter-sidebar h1").focus()
            }
            , 150)) : (this.$cove.validation.clear(),
            this.backupSearchDTO !== null && (this.searchDTO = this.backupSearchDTO))
        }
    },
    created() {
        p.getValidSearchTypes().includes(this.searchType) || (this.$router.push({
            name: "searchHome"
        }),
        this.$cove.notify({
            message: this.$t("page.searchResults.error.invalidSearchType", [this.searchType]),
            color: "error"
        })),
        this.searchDTO = p.parseURLParams(this.searchType, this.$route.query),
        this.loadSearchResults(!1)
    },
    methods: {
        search() {
            p.validateSearchCriteria(this.searchType, this.searchDTO) ? (this.searchDTO.paging.updateSort(this.internalSortBy, this.internalSortDesc),
            this.loadSearchResults(!0),
            this.backupSearchDTO = null,
            this.drawer = !1) : this.scrollSidebarTo(this.CONST.ERROR_CONTAINER_SELECTOR)
        },
        loadSearchResults(r) {
            if (r) {
                let t = p.generateQueryObject(this.searchType, this.searchDTO);
                this.$router.replace({
                    name: "searchResults",
                    params: {
                        searchType: this.searchType
                    },
                    query: {
                        criteria: t
                    }
                })
            }
            let s = {
                ...p.generateAPIQueryObject(this.searchType, this.searchDTO),
                ...this.searchDTO.paging.generateRequestParams()
            }
              , m = n.find(this.sortableColumns, {
                value: this.searchDTO.paging.sortBy
            });
            if (m.customSort) {
                let t = m.sortExpression();
                n.isNil(t) ? delete s.sort : s.sort = t
            }
            let S = p.getSearchConfigBySearchType(this.searchType)
              , o = this.$cove.getAPI({
                name: S.apiName,
                query: s
            });
            return this.loading = !0,
            N.get(o).then(t => {
                this.results = n.get(t, "data._embedded.results", []).map(v => ({
                    ...v,
                    searchResultKey: n.uniqueId()
                })),
                this.searchDTO.paging.parseResponse(t)
            }
            ).finally( () => {
                this.loading = !1
            }
            )
        },
        toggleDrawer() {
            this.drawer = !0
        },
        toggleAdvancedSearch() {
            this.searchDTO.advanced = !0,
            this.scrollSidebarTo(".js-criteria-anchor")
        }
    }
}
  , $ = {
    class: "px-4 py-2"
}
  , z = {
    class: "d-flex align-center"
}
  , Q = {
    style: {
        flex: "0 0 auto"
    }
}
  , K = {
    class: "text-h6",
    tabindex: "-1",
    style: {
        "line-height": "1rem",
        "outline-offset": "6px"
    }
}
  , M = {
    style: {
        flex: "0 0 auto"
    },
    class: "text-right"
}
  , W = {
    class: "d-sr-only"
}
  , X = {
    class: "mb-0 text-minimum-gray"
}
  , Y = {
    class: "px-4 pt-2 pb-6"
}
  , G = {
    class: "c-caption mb-5"
}
  , Z = {
    class: "px-4 pt-2 pb-4"
}
  , ee = {
    class: "c-caption js-criteria-anchor"
}
  , re = {
    class: "d-flex pa-4"
}
  , te = {
    class: "pr-1",
    style: {
        flex: "0 0 50%"
    }
}
  , se = {
    class: "pl-1",
    style: {
        flex: "0 0 50%"
    }
};
function ae(r, s, m, S, o, t) {
    const v = l("v-col")
      , D = l("v-row")
      , C = l("v-spacer")
      , P = l("v-icon")
      , V = l("v-btn")
      , T = l("v-divider")
      , A = l("c-autocomplete")
      , f = l("v-radio")
      , I = l("v-radio-group")
      , L = l("validation-error-panel")
      , w = l("field-description")
      , b = l("c-btn")
      , k = l("v-navigation-drawer")
      , x = l("page-wrapper");
    return h(),
    d(x, {
        title: r.$t("page.searchResults.title")
    }, {
        default: c( () => [a(D, null, {
            default: c( () => [a(v, {
                cols: "12"
            }, {
                default: c( () => [(h(),
                d(E(t.searchResultsComponent), {
                    searchDTO: o.searchDTO,
                    items: o.results,
                    headers: t.headers,
                    loading: o.loading,
                    onToggleDrawer: t.toggleDrawer,
                    "onUpdate:items": s[0] || (s[0] = u => t.loadSearchResults(!0))
                }, null, 40, ["searchDTO", "items", "headers", "loading", "onToggleDrawer"]))]),
                _: 1
            })]),
            _: 1
        }), a(k, {
            modelValue: o.drawer,
            "onUpdate:modelValue": s[6] || (s[6] = u => o.drawer = u),
            temporary: "",
            order: -1,
            location: "right",
            "disable-route-watcher": "",
            width: "400",
            class: "js-filter-sidebar"
        }, {
            append: c( () => [a(T), i("div", re, [i("div", te, [a(b, {
                block: "",
                type: "primary",
                onClick: t.search
            }, {
                default: c( () => [g(_(r.$t("application.button.update")), 1)]),
                _: 1
            }, 8, ["onClick"])]), i("div", se, [a(b, {
                block: "",
                onClick: s[5] || (s[5] = u => {
                    o.drawer = !1
                }
                )
            }, {
                default: c( () => [g(_(r.$t("application.button.cancel")), 1)]),
                _: 1
            })])])]),
            default: c( () => [i("div", $, [i("div", z, [i("div", Q, [i("h1", K, _(r.$t("global.drawer.filterSort.title")), 1)]), a(C), i("div", M, [a(V, {
                icon: "",
                variant: "text",
                size: "small",
                onClick: s[1] || (s[1] = u => {
                    o.drawer = !1
                }
                )
            }, {
                default: c( () => [a(P, {
                    style: {
                        "font-size": "22px"
                    }
                }, {
                    default: c( () => [g(" mdi-close ")]),
                    _: 1
                }), i("span", W, _(r.$t("global.close.sidebar")), 1)]),
                _: 1
            })])]), i("p", X, _(r.$t("global.drawer.filterSort.description")), 1)]), a(T), i("div", Y, [i("div", G, _(r.$t("global.sort")), 1), a(A, {
                modelValue: o.internalSortBy,
                "onUpdate:modelValue": s[2] || (s[2] = u => o.internalSortBy = u),
                label: r.$t("global.drawer.filterSort.field.sortBy"),
                clearable: !1,
                items: t.sortableColumns,
                "item-title": "text",
                "item-value": "value",
                outlined: "",
                "hide-details": ""
            }, null, 8, ["modelValue", "label", "items"]), a(j, {
                name: "fade-transition"
            }, {
                default: c( () => [t.showSortDirections ? (h(),
                d(I, {
                    key: 0,
                    modelValue: o.internalSortDesc,
                    "onUpdate:modelValue": s[3] || (s[3] = u => o.internalSortDesc = u),
                    color: "primary",
                    density: "compact",
                    class: "mb-n3 mt-5",
                    "hide-details": "",
                    label: r.$t("global.drawer.filterSort.field.sortDir")
                }, {
                    default: c( () => [a(f, {
                        label: r.$t("global.ascending"),
                        value: !1
                    }, null, 8, ["label"]), a(f, {
                        label: r.$t("global.descending"),
                        value: !0
                    }, null, 8, ["label"])]),
                    _: 1
                }, 8, ["modelValue", "label"])) : R("", !0)]),
                _: 1
            })]), a(T), i("div", Z, [i("div", ee, _(r.$t("global.filter")), 1), a(L, {
                class: "mt-2 mb-n1"
            }), (h(),
            d(E(t.searchCriteriaComponent), {
                searchType: m.searchType,
                searchDTO: o.searchDTO
            }, null, 8, ["searchType", "searchDTO"])), t.supportsAdvancedSearch && !o.searchDTO.advanced ? (h(),
            d(D, {
                key: 0,
                "no-gutters": "",
                class: "mt-0"
            }, {
                default: c( () => [a(v, {
                    cols: "12"
                }, {
                    default: c( () => [i("button", {
                        type: "button",
                        class: "link-button",
                        onClick: s[4] || (s[4] = (...u) => t.toggleAdvancedSearch && t.toggleAdvancedSearch(...u)),
                        "aria-describedby": "a21a094c-6929-484a-b020-2477f9fdbb0f"
                    }, _(r.$t("page.searchCriteria.button.switchToAdvanced")), 1), a(w, {
                        id: "a21a094c-6929-484a-b020-2477f9fdbb0f",
                        "message-key": "page.searchCriteria.button.switchToAdvanced.description"
                    })]),
                    _: 1
                })]),
                _: 1
            })) : R("", !0)])]),
            _: 1
        }, 8, ["modelValue"])]),
        _: 1
    }, 8, ["title"])
}
const he = B(J, [["render", ae]]);
export {he as default};
