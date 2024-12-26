import {_ as E, o as d, c as g, t as i, n as me, a as n, u as M, b as U, d as w, e as C, r, f, g as W, w as e, h as o, i as s, j as v, F as D, k as Y, l as H, m as _e, p as J, q as ve, s as he, v as G, x as K, y as T, z as I, T as ge, A as ke} from "./index-c903cc1f.js";
import {m as ye} from "./marked.esm-14d91642.js";
import {F as R} from "./FieldDescription-c5e8cc53.js";
import {V as z} from "./ValidationErrorPanel-b4affc40.js";
import {C as be} from "./CutoutArea-3a511202.js";
import {U as $e} from "./userAccess-944f72fe.js";
const we = {
    computed: {
        largeDisplay() {
            return this.$vuetify.display.lgAndUp
        }
    }
};
function Ae(t, l, b, A, c, a) {
    return d(),
    g("div", {
        class: me(["banner-project-name text-truncate", {
            "text-left pr-2 pl-4": !a.largeDisplay
        }]),
        style: {
            flex: "1 1 50%"
        }
    }, i(t.$t("application.project.name")), 3)
}
const Se = E(we, [["render", Ae]])
  , Ee = {}
  , Oe = {
    class: "d-none d-lg-block"
}
  , Ve = {
    class: "banner-company-name"
}
  , Ce = {
    class: "banner-application-name"
};
function De(t, l) {
    return d(),
    g("div", Oe, [n("div", Ve, i(t.$t("application.company.name")), 1), n("div", Ce, i(t.$t("application.application.name")), 1)])
}
const Pe = E(Ee, [["render", De]])
  , Te = {};
function Ie(t, l) {
    return d(),
    g("div")
}
const Ne = E(Te, [["render", Ie]])
  , q = M()
  , Ue = U()
  , xe = {
    inheritAttrs: !1,
    components: {
        FieldDescription: R,
        ValidationErrorPanel: z,
        CutoutArea: be
    },
    props: {
        modelValue: {
            type: Boolean
        }
    },
    data() {
        return {
            loading: !1,
            adminLoaded: !1,
            preview: !1,
            localeID: null,
            text: null,
            configurationGroupID: null,
            pageHelpResourceID: null,
            errorScope: "popupHelp",
            configurationGroups: null
        }
    },
    watch: {
        modelValue: {
            immediate: !0,
            handler(t) {
                t ? this.isAdmin ? w.isEmpty(this.configurationGroups) && this.loadConfigurationGroups() : this.loadPublicView(this.userLocale) : (this.text = null,
                this.localeID = null,
                this.configurationGroupID = null,
                this.pageHelpResourceID = null,
                this.adminLoaded = !1),
                this.$cove.validation.clear(this.errorScope)
            }
        }
    },
    computed: {
        isAdmin() {
            return q.isAdmin
        },
        isNew() {
            return this.pageHelpResourceID === null
        },
        locales() {
            return Ue.locales
        },
        selectedLocale() {
            let t = w.find(this.locales, {
                resourceID: this.localeID
            });
            return w.isNil(t) ? null : t.displayName
        },
        userLocale() {
            return w.find(this.locales, {
                localeCode: q.localeCode
            })
        },
        previewText() {
            return ye.parse(w.escape(this.text), {
                breaks: !0
            })
        }
    },
    methods: {
        loadConfigurationGroups() {
            this.$cove.block();
            let t = this.$cove.getAPI({
                name: "api.configurationgroups",
                query: {
                    customerAvailableOnly: !0
                }
            });
            C.get(t).then(l => {
                this.configurationGroups = w.get(l, "data._embedded.results", [])
            }
            ).finally( () => {
                this.$cove.unblock()
            }
            )
        },
        validate() {
            return this.$cove.validation.clear(this.errorScope),
            this.$cove.validation.required(this.text, "page.popupHelp.field.text", `${this.errorScope}:text`),
            this.$cove.validation.string.maxLength(this.text, 1e4, "page.popupHelp.field.text", `${this.errorScope}:text`),
            this.$cove.validation.required(this.configurationGroupID, "page.popupHelp.field.configurationGroup", `${this.errorScope}:configurationGroupID`),
            !this.$cove.validation.hasErrors(this.errorScope)
        },
        save() {
            if (this.$cove.blockNow(),
            !this.validate())
                this.$cove.unblock();
            else {
                let l = this.isNew ? this.$cove.getAPI({
                    name: "api.pageHelpMessages"
                }) : this.$cove.getAPI({
                    name: "api.pageHelpMessage",
                    params: {
                        resourceID: this.pageHelpResourceID
                    }
                });
                C({
                    url: l,
                    method: this.isNew ? "post" : "patch",
                    data: this.toBean()
                }).then( () => {
                    this.$cove.notify({
                        message: this.$t("application.save.success"),
                        color: "success"
                    }),
                    this.close()
                }
                ).finally( () => {
                    this.$cove.unblock()
                }
                )
            }
        },
        remove() {
            this.$cove.confirm({
                message: this.$t("application.remove.confirm")
            }).then(t => {
                if (t) {
                    this.$cove.blockNow();
                    let l = this.$cove.getAPI({
                        name: "api.pageHelpMessage",
                        params: {
                            resourceID: this.pageHelpResourceID
                        }
                    });
                    C.delete(l).then( () => {
                        this.$cove.notify({
                            message: this.$t("application.remove.success"),
                            color: "success"
                        }),
                        this.close()
                    }
                    ).finally( () => {
                        this.$cove.unblock()
                    }
                    )
                }
            }
            )
        },
        togglePreview(t, l) {
            return this.preview = l,
            this.$nextTick().then( () => {
                document.getElementById(l ? "ph-exit-preview-link" : "ph-preview-link").focus()
            }
            ),
            t.preventDefault(),
            !1
        },
        loadPublicView(t) {
            this.loading = !0,
            this.loadHelpRecord(t).finally( () => {
                this.loading = !1
            }
            )
        },
        loadHelpRecord(t) {
            this.$cove.block();
            let l = this.$cove.getAPI({
                name: "api.pageHelpMessages.search",
                query: {
                    routeName: this.$route.name,
                    localeID: t.resourceID
                }
            });
            return C.get(l).then(b => {
                let A = b.data;
                w.isObject(A) && this.fromBean(A)
            }
            ).finally( () => {
                this.$cove.unblock()
            }
            )
        },
        fromBean(t) {
            this.pageHelpResourceID = t.resourceID,
            this.text = w.unescape(t.helpMessage),
            this.localeID = t.locale.resourceID,
            this.configurationGroupID = t.configurationGroup.resourceID
        },
        toBean() {
            return {
                routeName: this.$route.name,
                helpMessage: w.escape(this.text),
                localeID: this.localeID,
                configurationGroupID: this.configurationGroupID
            }
        },
        toggleAdminHelp(t) {
            this.localeID = t.resourceID,
            this.loadHelpRecord(t).finally( () => {
                this.adminLoaded = !0
            }
            )
        },
        close() {
            this.$emit("update:modelValue", !1)
        }
    }
}
  , Me = {
    class: "px-5 pt-6 pb-4"
}
  , Le = {
    key: 0,
    style: {}
}
  , Be = {
    class: "my-5",
    style: {
        "list-style": "none"
    }
}
  , He = ["onClick"]
  , Re = {
    key: 0
}
  , ze = {
    href: "https://www.markdownguide.org/basic-syntax/",
    target: "_blank"
}
  , Fe = {
    key: 1
}
  , Ge = ["innerHTML"]
  , Ke = {
    class: "mt-1 mb-5 text-right"
}
  , qe = ["innerHTML"];
function je(t, l, b, A, c, a) {
    const _ = r("validation-error-panel")
      , h = r("v-col")
      , S = r("c-textarea")
      , $ = r("field-description")
      , p = r("c-text-field")
      , u = r("c-autocomplete")
      , O = r("v-row")
      , V = r("cutout-area")
      , x = r("c-btn")
      , L = r("c-dialog");
    return d(),
    f(L, {
        "model-value": b.modelValue && !c.loading,
        "close-key": "cove.general.close",
        titleKey: "page.popupHelp.title",
        "onUpdate:modelValue": a.close,
        width: "700"
    }, W({
        default: e( () => [n("div", Me, [a.isAdmin ? (d(),
        f(O, {
            key: 0,
            "no-gutters": ""
        }, {
            default: e( () => [o(h, {
                cols: "12"
            }, {
                default: e( () => [o(_, {
                    class: "mb-6",
                    "error-scope": c.errorScope
                }, null, 8, ["error-scope"])]),
                _: 1
            }), c.adminLoaded ? (d(),
            g(D, {
                key: 1
            }, [o(h, {
                cols: "12"
            }, {
                default: e( () => [c.preview ? (d(),
                g("div", Fe, [n("div", {
                    class: "pa-4 rounded markdown",
                    style: {
                        "background-color": "#f7f7f7",
                        border: "1px solid #a0a0a0"
                    },
                    innerHTML: a.previewText
                }, null, 8, Ge), n("div", Ke, [n("a", {
                    id: "ph-exit-preview-link",
                    href: "#",
                    style: {
                        "font-style": "italic",
                        "font-size": ".9rem"
                    },
                    onClick: l[2] || (l[2] = y => {
                        a.togglePreview(y, !1)
                    }
                    )
                }, i(t.$t("page.popupHelp.field.text.description.exitLink")), 1)])])) : (d(),
                g("div", Re, [c.preview ? v("", !0) : (d(),
                f(S, {
                    modelValue: c.text,
                    "onUpdate:modelValue": l[0] || (l[0] = y => c.text = y),
                    key: `${c.errorScope}:text`,
                    label: t.$t("page.popupHelp.field.text"),
                    rows: "8",
                    outlined: "",
                    required: "",
                    "hide-details": "auto",
                    "aria-describedby": "b8199e75-1ce7-4b8f-87cf-7c1987df0648"
                }, null, 8, ["modelValue", "label"])), o($, {
                    id: "b8199e75-1ce7-4b8f-87cf-7c1987df0648"
                }, {
                    default: e( () => [s(i(t.$t("page.popupHelp.field.text.description.prefix")) + " ", 1), n("a", ze, i(t.$t("page.popupHelp.field.text.description.markdownLink")), 1), s(" " + i(t.$t("page.popupHelp.field.text.description.also")) + " ", 1), n("a", {
                        id: "ph-preview-link",
                        href: "#",
                        onClick: l[1] || (l[1] = y => {
                            a.togglePreview(y, !0)
                        }
                        )
                    }, i(t.$t("page.popupHelp.field.text.description.previewLink")), 1)]),
                    _: 1
                })]))]),
                _: 1
            }), o(h, {
                cols: "12"
            }, {
                default: e( () => [o(p, {
                    "model-value": a.selectedLocale,
                    label: t.$t("page.popupHelp.field.locale"),
                    outlined: "",
                    disabled: "",
                    "hide-details": "auto",
                    "aria-describedby": "ddbd8d0e-e241-4bcd-aefc-afd4a9a62ac0"
                }, null, 8, ["model-value", "label"]), o($, {
                    id: "ddbd8d0e-e241-4bcd-aefc-afd4a9a62ac0",
                    "message-key": "page.popupHelp.field.locale.description"
                })]),
                _: 1
            }), o(h, {
                cols: "12"
            }, {
                default: e( () => [(d(),
                f(u, {
                    items: c.configurationGroups,
                    modelValue: c.configurationGroupID,
                    "onUpdate:modelValue": l[3] || (l[3] = y => c.configurationGroupID = y),
                    "item-title": "displayName",
                    "item-value": "resourceID",
                    label: t.$t("page.popupHelp.field.configurationGroup"),
                    outlined: "",
                    required: "",
                    clearable: !1,
                    key: `${c.errorScope}:configurationGroupID`,
                    "hide-details": "auto",
                    "aria-describedby": "3f675bfe-d7c7-4dd2-9e1a-a6f6dac0a55c"
                }, null, 8, ["items", "modelValue", "label"])), o($, {
                    id: "3f675bfe-d7c7-4dd2-9e1a-a6f6dac0a55c",
                    "message-key": "page.popupHelp.field.configurationGroup.description"
                })]),
                _: 1
            })], 64)) : (d(),
            g("div", Le, [n("div", null, i(t.$t("page.popupHelp.admin.direction")), 1), n("div", null, [n("ul", Be, [(d(!0),
            g(D, null, Y(a.locales, y => (d(),
            g("li", {
                key: y.resourceID,
                class: "mt-4"
            }, [n("button", {
                type: "button",
                class: "link-button",
                onClick: F => {
                    a.toggleAdminHelp(y)
                }
            }, i(y.displayName), 9, He)]))), 128))])])]))]),
            _: 1
        })) : c.text !== null ? (d(),
        g("div", {
            key: 1,
            innerHTML: a.previewText,
            class: "markdown"
        }, null, 8, qe)) : (d(),
        f(V, {
            key: 2,
            class: "mt-5 mb-8"
        }, {
            default: e( () => [s(i(t.$t("page.popupHelp.helpMissing")), 1)]),
            _: 1
        }))])]),
        _: 2
    }, [a.isAdmin && c.adminLoaded ? {
        name: "actions-right",
        fn: e( () => [o(x, {
            type: "primary",
            onClick: a.save
        }, {
            default: e( () => [s(i(t.$t("application.button.save")), 1)]),
            _: 1
        }, 8, ["onClick"]), a.isNew ? v("", !0) : (d(),
        f(x, {
            key: 0,
            type: "danger",
            onClick: a.remove
        }, {
            default: e( () => [s(i(t.$t("application.button.remove")), 1)]),
            _: 1
        }, 8, ["onClick"]))]),
        key: "0"
    } : void 0]), 1032, ["model-value", "onUpdate:modelValue"])
}
const We = E(xe, [["render", je]]);
const B = U()
  , Ye = {
    computed: {
        visible() {
            return B.serverErrorPopupVisible
        },
        details() {
            return B.serverErrorDetails
        }
    },
    watch: {
        visible(t) {
            t && this.$cove.focusElement("#copy-error-button")
        }
    },
    methods: {
        copyToClipboard() {
            navigator.clipboard.writeText(JSON.stringify(this.details, null, 4))
        },
        close() {
            B.$patch({
                serverErrorPopupVisible: !1
            })
        }
    }
}
  , Je = {
    class: "font-weight-regular"
}
  , Ze = {
    class: "mt-1 text-minimum-gray"
}
  , Qe = {
    key: 0,
    class: "d-grid mt-8 mb-8",
    style: {
        "grid-template-columns": "30% 70%"
    }
}
  , Xe = {
    class: "d-flex mt-3"
}
  , et = {
    style: {
        flex: "0 0 50%"
    }
}
  , tt = {
    style: {
        flex: "0 0 50%"
    },
    class: "text-right"
};
function ot(t, l, b, A, c, a) {
    const _ = r("v-divider")
      , h = r("c-btn")
      , S = r("v-card")
      , $ = r("v-dialog");
    return d(),
    f($, {
        "model-value": a.visible,
        width: "600",
        persistent: ""
    }, {
        default: e( () => [o(S, {
            class: "px-4 py-3",
            style: {
                "border-left": "8px solid rgb(var(--v-theme-error))"
            }
        }, {
            default: e( () => [n("h1", Je, i(t.$t("popup.serverError.title")), 1), n("div", Ze, i(t.$t("popup.serverError.description")), 1), a.details !== null ? (d(),
            g("dl", Qe, [n("dt", null, i(t.$t("popup.serverError.field.url")), 1), n("dd", null, i(a.details.url), 1), n("dt", null, i(t.$t("popup.serverError.field.method")), 1), n("dd", null, i(a.details.method), 1), n("dt", null, i(t.$t("popup.serverError.field.statusCode")), 1), n("dd", null, i(a.details.statusCode), 1), n("dt", null, i(t.$t("global.error.dateUTC")), 1), n("dd", null, i(a.details.timestamp), 1), a.details.errorReference ? (d(),
            g(D, {
                key: 0
            }, [n("dt", null, i(t.$t("global.error.errorReference")), 1), n("dd", null, i(a.details.errorReference), 1)], 64)) : v("", !0)])) : v("", !0), o(_), n("div", Xe, [n("div", et, [o(h, {
                type: "primary",
                onClick: a.copyToClipboard,
                id: "copy-error-button"
            }, {
                default: e( () => [s(i(t.$t("popup.serverError.button.copyToClipboard")), 1)]),
                _: 1
            }, 8, ["onClick"])]), n("div", tt, [o(h, {
                onClick: a.close
            }, {
                default: e( () => [s(i(t.$t("cove.general.close")), 1)]),
                _: 1
            }, 8, ["onClick"])])])]),
            _: 1
        })]),
        _: 1
    }, 8, ["model-value"])
}
const it = E(Ye, [["render", ot], ["__scopeId", "data-v-d5b99a64"]])
  , j = U()
  , at = {
    computed: {
        visible() {
            return j.serverValidationErrorPopupVisible
        },
        errors() {
            return this.$cove.validation.getAllErrorMessages()
        }
    },
    watch: {
        visible(t) {
            t && this.$cove.focusElement("#error-close-button")
        }
    },
    methods: {
        close() {
            j.$patch({
                serverValidationErrorPopupVisible: !1
            }),
            this.$cove.validation.clear()
        }
    }
}
  , lt = {
    class: "font-weight-regular"
}
  , st = {
    class: "mt-1 text-minimum-gray"
}
  , nt = {
    class: "mt-3 text-right"
};
function rt(t, l, b, A, c, a) {
    const _ = r("v-alert")
      , h = r("v-divider")
      , S = r("c-btn")
      , $ = r("v-card")
      , p = r("v-dialog");
    return d(),
    f(p, {
        "model-value": a.visible,
        width: "600",
        persistent: ""
    }, {
        default: e( () => [o($, {
            class: "px-4 py-3",
            style: {
                "border-left": "8px solid rgb(var(--v-theme-error))"
            }
        }, {
            default: e( () => [n("h1", lt, i(t.$t("popup.serverValidationError.title")), 1), n("div", st, i(t.$t("popup.serverValidationError.description")), 1), o(_, {
                class: "mt-6 mb-16",
                elevation: "2",
                color: "error",
                variant: "tonal",
                style: {
                    border: "2px solid rgb(var(--v-theme-error))"
                }
            }, {
                default: e( () => [n("ul", null, [(d(!0),
                g(D, null, Y(a.errors, u => (d(),
                g("li", null, i(u), 1))), 256))])]),
                _: 1
            }), o(h), n("div", nt, [o(S, {
                id: "error-close-button",
                onClick: a.close
            }, {
                default: e( () => [s(i(t.$t("cove.general.close")), 1)]),
                _: 1
            }, 8, ["onClick"])])]),
            _: 1
        })]),
        _: 1
    }, 8, ["model-value"])
}
const dt = E(at, [["render", rt]])
  , ct = M()
  , pt = U()
  , ut = {
    computed: {
        visible() {
            return pt.userInactivityPopupVisible
        },
        user() {
            return ct
        }
    },
    watch: {
        visible(t) {
            t && this.$cove.focusElement("#stay-active-button")
        }
    },
    methods: {
        redirectToLogout: H,
        keepAlive() {
            _e().then(t => {
                t === null ? J() : (ve(),
                he(this.CONST.BROADCAST_MESSAGE_KEEP_ALIVE))
            }
            )
        }
    }
}
  , ft = {
    class: "font-weight-regular"
}
  , mt = {
    class: "mt-2 text-minimum-gray",
    style: {
        "font-size": "1.1rem"
    }
}
  , _t = {
    class: "d-flex",
    style: {
        gap: "12px"
    }
}
  , vt = {
    style: {
        flex: "1 1 50%"
    }
}
  , ht = {
    style: {
        flex: "1 1 50%"
    }
};
function gt(t, l, b, A, c, a) {
    const _ = r("v-divider")
      , h = r("c-btn")
      , S = r("v-card")
      , $ = r("v-dialog");
    return d(),
    f($, {
        "model-value": a.visible,
        width: "560",
        persistent: ""
    }, {
        default: e( () => [o(S, {
            class: "pa-5"
        }, {
            default: e( () => [n("h1", ft, i(t.$t("popup.sessionExpiry.title", [a.user.firstName])), 1), n("div", mt, i(t.$t("popup.sessionExpiry.description")), 1), o(_, {
                class: "mt-12 mb-4"
            }), n("div", _t, [n("div", vt, [o(h, {
                size: "large",
                block: "",
                type: "primary",
                id: "stay-active-button",
                onClick: a.keepAlive
            }, {
                default: e( () => [s(i(t.$t("global.yes")), 1)]),
                _: 1
            }, 8, ["onClick"])]), n("div", ht, [o(h, {
                size: "large",
                block: "",
                onClick: a.redirectToLogout
            }, {
                default: e( () => [s(i(t.$t("global.no")), 1)]),
                _: 1
            }, 8, ["onClick"])])])]),
            _: 1
        })]),
        _: 1
    }, 8, ["model-value"])
}
const kt = E(ut, [["render", gt]])
  , yt = {
    inheritAttrs: !1,
    components: {
        ValidationErrorPanel: z,
        FieldDescription: R
    },
    props: {
        modelValue: {
            type: Boolean
        }
    },
    data() {
        return {
            password: null,
            showExitPrompt: !1,
            errorScope: "kioskPopup",
            passwordMinLength: 8,
            passwordMaxLength: 50
        }
    },
    watch: {
        showExitPrompt(t) {
            t && this.$cove.focusElement("#kiosk-password")
        },
        modelValue(t) {
            t || (this.$cove.validation.clear(this.errorScope),
            this.password = null,
            this.showExitPrompt = !1)
        }
    },
    methods: {
        validate() {
            return this.$cove.validation.clear(this.errorScope),
            this.$cove.validation.required(this.password, "popup.kioskMode.field.exitPassword", `${this.errorScope}:password`),
            this.$cove.validation.string.minLength(this.password, this.passwordMinLength, "popup.kioskMode.field.exitPassword", `${this.errorScope}:password`),
            this.$cove.validation.string.maxLength(this.password, this.passwordMaxLength, "popup.kioskMode.field.exitPassword", `${this.errorScope}:password`),
            !this.$cove.validation.hasErrors(this.errorScope)
        },
        exitKioskMode() {
            this.validate() && (this.$cove.blockNow(),
            C.delete(this.$cove.getAPI({
                name: "api.kiosk"
            }), {
                data: {
                    password: this.password
                },
                errorHandlers: {
                    400: l => {
                        w.get(l, "response.data.validationErrors", []).forEach( (A, c) => {
                            let a = A.replace(/^.*?:\s*/, "");
                            this.$cove.validation.addErrorText(`${this.errorScope}:password`, a)
                        }
                        )
                    }
                }
            }).then( () => {
                H()
            }
            ).catch( () => {
                this.$cove.unblock()
            }
            ))
        },
        close() {
            this.$emit("update:modelValue", !1)
        }
    }
}
  , bt = {
    class: "ma-4"
}
  , $t = {
    key: "details"
}
  , wt = {
    class: "c-caption mb-1"
}
  , At = {
    class: "text-minimum-gray",
    style: {
        "max-width": "75ch"
    }
}
  , St = {
    class: "mt-6 pb-2"
}
  , Et = {
    key: "exit"
}
  , Ot = {
    class: "c-caption mb-1"
}
  , Vt = {
    class: "text-minimum-gray"
}
  , Ct = {
    class: "mt-8 mb-12"
}
  , Dt = {
    key: "blank"
};
function Pt(t, l, b, A, c, a) {
    const _ = r("validation-error-panel")
      , h = r("c-text-field")
      , S = r("field-description")
      , $ = r("v-scroll-x-reverse-transition")
      , p = r("c-btn")
      , u = r("v-fade-transition")
      , O = r("c-dialog");
    return d(),
    f(O, {
        "model-value": b.modelValue,
        "close-key": "cove.general.close",
        "title-key": "kioskMode.title",
        width: "600",
        "onUpdate:modelValue": a.close
    }, {
        "actions-right": e( () => [o(u, {
            mode: "out-in"
        }, {
            default: e( () => [c.showExitPrompt ? (d(),
            f(p, {
                type: "primary",
                key: "button",
                onClick: a.exitKioskMode
            }, {
                default: e( () => [s(i(t.$t("popup.kioskMode.button.exitKioskMode")), 1)]),
                _: 1
            }, 8, ["onClick"])) : (d(),
            g("div", Dt))]),
            _: 1
        })]),
        default: e( () => [o(_, {
            "error-scope": c.errorScope,
            class: "ma-4 mb-8"
        }, null, 8, ["error-scope"]), n("div", bt, [o($, {
            mode: "out-in"
        }, {
            default: e( () => [c.showExitPrompt ? (d(),
            g("div", Et, [n("div", Ot, i(t.$t("popup.kioskMode.exit.title")), 1), n("div", Vt, i(t.$t("popup.kioskMode.exit.description")), 1), n("div", Ct, [(d(),
            f(h, {
                modelValue: c.password,
                "onUpdate:modelValue": l[1] || (l[1] = V => c.password = V),
                outlined: "",
                required: "",
                maxlength: c.passwordMaxLength,
                label: t.$t("popup.kioskMode.field.exitPassword"),
                type: "password",
                key: `${c.errorScope}:password`,
                id: "kiosk-password",
                "hide-details": "auto",
                "aria-describedby": "786d673c-6875-4283-ad86-9b7b79ab7072"
            }, null, 8, ["modelValue", "maxlength", "label"])), o(S, {
                id: "786d673c-6875-4283-ad86-9b7b79ab7072"
            }, {
                default: e( () => [s(i(t.$t("popup.kioskMode.field.exitPassword.description", [c.passwordMinLength, c.passwordMaxLength])), 1)]),
                _: 1
            })])])) : (d(),
            g("div", $t, [n("div", wt, i(t.$t("global.details")), 1), n("div", At, i(t.$t("popup.kioskMode.description")), 1), n("div", St, [n("button", {
                type: "button",
                class: "link-button",
                onClick: l[0] || (l[0] = V => c.showExitPrompt = !0)
            }, i(t.$t("popup.kioskMode.button.exitKioskMode")), 1)])]))]),
            _: 1
        })])]),
        _: 1
    }, 8, ["model-value", "onUpdate:modelValue"])
}
const Tt = E(yt, [["render", Pt]])
  , P = M()
  , It = {
    inheritAttrs: !1,
    components: {
        ValidationErrorPanel: z,
        FieldDescription: R
    },
    props: {
        modelValue: {
            type: Boolean
        }
    },
    data() {
        return {
            selectedAttorney: null,
            errorScope: "workOnBehalfOfPopup",
            showWorkAsMyself: !1
        }
    },
    computed: {
        availableAttorneys() {
            return w.sortBy(this.convertToAttorneyUserDTOs(w.get(P, "supportsAttorneyUsers", [])), "sortName")
        }
    },
    watch: {
        modelValue(t) {
            t ? (this.$cove.validation.clear(this.errorScope),
            this.showWorkAsMyself = !!P.isWorkingOnBehalfOf) : this.selectedAttorney = null
        }
    },
    methods: {
        convertToAttorneyUserDTOs(t) {
            let l = [];
            return w.isEmpty(t) || w.forEach(t, b => {
                let A = this.createAttorneyDTO(b.resourceID, b.actor.sortName);
                l.push(A)
            }
            ),
            l
        },
        createAttorneyDTO(t, l) {
            return {
                uuid: t,
                sortName: l
            }
        },
        workAsMyself() {
            this.$cove.blockNow(),
            C.patch(this.$cove.getAPI({
                name: "api.user.currentuser"
            }), {
                onBehalfOfAttorneyUserID: null
            }).then( () => P.reload()).then( () => {
                P.poll(),
                this.$router.push({
                    name: "home"
                }),
                this.$cove.notify({
                    message: this.$t("popup.workOnBehalfOf.workAsMyself.success"),
                    color: "success"
                }),
                this.close()
            }
            ).finally( () => {
                this.$cove.unblock()
            }
            )
        },
        validateSave() {
            this.$cove.validation.startScope(this.errorScope),
            this.$cove.validation.clear(),
            this.$cove.validation.required(this.selectedAttorney, "popup.workOnBehalfOf.field.attorney", "attorneyAutocomplete");
            let t = !this.$cove.validation.hasErrors();
            return this.$cove.validation.startScope(this.errorScope),
            t
        },
        save() {
            this.validateSave() && (this.$cove.blockNow(),
            C.patch(this.$cove.getAPI({
                name: "api.user.currentuser"
            }), {
                onBehalfOfAttorneyUserID: this.selectedAttorney.uuid
            }).then( () => P.reload()).then( () => {
                P.poll(),
                this.$router.push({
                    name: "home"
                }),
                this.$cove.notify({
                    message: this.$t("popup.workOnBehalfOf.save.success"),
                    color: "success"
                }),
                this.close()
            }
            ).finally( () => {
                this.$cove.unblock()
            }
            ))
        },
        close() {
            this.$emit("update:model-value", !1)
        }
    }
}
  , Nt = {
    class: "ma-9"
};
function Ut(t, l, b, A, c, a) {
    const _ = r("validation-error-panel")
      , h = r("c-autocomplete")
      , S = r("field-description")
      , $ = r("c-btn")
      , p = r("c-dialog");
    return d(),
    f(p, {
        "model-value": b.modelValue,
        width: "600",
        "close-key": "cove.general.cancel",
        "title-key": "popup.workOnBehalfOf.title",
        "onUpdate:modelValue": a.close
    }, W({
        "actions-right": e( () => [o($, {
            type: "primary",
            onClick: a.save
        }, {
            default: e( () => [s(i(t.$t("global.save")), 1)]),
            _: 1
        }, 8, ["onClick"])]),
        default: e( () => [o(_, {
            class: "ma-4",
            "error-scope": c.errorScope
        }, null, 8, ["error-scope"]), n("div", Nt, [(d(),
        f(h, {
            modelValue: c.selectedAttorney,
            "onUpdate:modelValue": l[0] || (l[0] = u => c.selectedAttorney = u),
            label: t.$t("popup.workOnBehalfOf.field.attorney"),
            items: a.availableAttorneys,
            key: `${c.errorScope}:attorneyAutocomplete`,
            "item-title": "sortName",
            "item-value": "uuid",
            "return-object": "",
            outlined: "",
            required: "",
            "hide-details": "auto",
            "aria-describedby": "fc62bb27-c892-4f6d-98b2-6e0affb9d304"
        }, null, 8, ["modelValue", "label", "items"])), o(S, {
            id: "fc62bb27-c892-4f6d-98b2-6e0affb9d304",
            "message-key": "popup.workOnBehalfOf.field.attorney.description"
        })])]),
        _: 2
    }, [c.showWorkAsMyself ? {
        name: "actions-left",
        fn: e( () => [o($, {
            type: "primary",
            onClick: a.workAsMyself
        }, {
            default: e( () => [s(i(t.$t("popup.workOnBehalfOf.button.workAsMyself")), 1)]),
            _: 1
        }, 8, ["onClick"])]),
        key: "0"
    } : void 0]), 1032, ["model-value", "onUpdate:modelValue"])
}
const xt = E(It, [["render", Ut]])
  , k = M()
  , N = U()
  , Mt = {
    components: {
        BannerCenter: Se,
        BannerLeft: Pe,
        NavigationBottom: Ne,
        PageHelpPopup: We,
        ServerErrorPopup: it,
        ServerValidationErrorPopup: dt,
        KioskDetailsPopup: Tt,
        InactivityPopup: kt,
        WorkOnBehalfOfPopup: xt
    },
    data() {
        return {
            UserAccess: $e,
            drawer: null,
            skipLinks: !1,
            pageHelpPopupVisible: !1,
            kioskDetailsPopupVisible: !1,
            workOnBehalfOfPopupVisible: !1
        }
    },
    computed: {
        user() {
            return k
        },
        hasSession() {
            return k.hasSession
        },
        effectiveUserDisplayName() {
            let t = "";
            if (k.isWorkingOnBehalfOf) {
                let l = w.toUpper(k.firstName.substring(0, 1)) + "." + w.toUpper(k.lastName.substring(0, 1)) + ".";
                t = this.$t("global.arg1.as.arg2", [l, k.onBehalfOfAttorneyUser.displayName])
            } else
                t = k.displayName;
            return t
        },
        isUserAssociatedToOrg() {
            return k.isAssociatedToOrg
        },
        isUserSupportStaffForAnAttorney() {
            return k.isSupportStaffForAnAttorney
        },
        largeDisplay() {
            return this.$vuetify.display.lgAndUp
        },
        smallOrDownDisplay() {
            return this.$vuetify.display.smAndDown
        },
        isKioskMode() {
            return N.kioskMode
        },
        isEnableDocumentPurchaseFunctions() {
            return N.getAppProperty(this.CONST.FEATURE_PROPERTY_ENABLE_DOCUMENT_PURCHASE_FUNCTIONS)
        },
        isEnableSubscriptionFunctions() {
            return N.getAppProperty(this.CONST.FEATURE_PROPERTY_ENABLE_SUBSCRIPTION_FUNCTIONS)
        },
        isEnabledSupportStaffFunctions() {
            return N.getAppProperty(this.CONST.FEATURE_PROPERTY_ENABLE_SUPPORT_STAFF_FUNCTIONS)
        },
        isFiler() {
            return k.hasRole(this.CONST.ROLE_FILER)
        },
        isInterpreter() {
            return k.hasRole(this.CONST.ROLE_INTERPRETER)
        },
        isAttorney() {
            return k.hasRole(this.CONST.ROLE_ATTORNEY)
        },
        isOrgAdmin() {
            return k.hasRole(this.CONST.ROLE_ORGANIZATION_ADMINISTRATOR)
        },
        isAdmin() {
            return k.isAdmin
        },
        hasUnreadAnnouncements() {
            return k.hasUnreadAnnouncements
        },
        hasUnreadNotifications() {
            return k.hasUnreadNotifications
        },
        hasUnreadServices() {
            return k.hasUnreadServices
        },
        hasUnpurchasedDocumentsInCart() {
            return k.hasUnpurchasedDocumentsInCart
        },
        routerViewKey() {
            return N.routerViewKey
        }
    },
    methods: {
        redirectToLogin: J,
        redirectToLogout: H,
        focusTitle() {
            this.$cove.focusElement(".page-focus")
        }
    }
}
  , Lt = {
    id: "skip-links"
}
  , Bt = {
    class: "d-lg-none",
    style: {
        height: "48px"
    }
}
  , Ht = {
    class: "d-sr-only"
}
  , Rt = {
    class: "text-left text-truncate",
    style: {
        "max-width": "200px"
    }
}
  , zt = {
    class: "d-sr-only"
}
  , Ft = {
    class: "d-sr-only"
}
  , Gt = {
    class: "d-none d-print-flex align-center"
}
  , Kt = {
    style: {
        flex: "1 1 auto",
        "font-size": "1rem"
    },
    class: "font-weight-medium"
}
  , qt = {
    key: 0,
    style: {
        flex: "1 1 auto",
        "font-size": "1rem"
    },
    class: "text-right"
}
  , jt = {
    class: "d-print-none"
}
  , Wt = {
    style: {
        flex: "1 1 auto"
    }
}
  , Yt = {
    style: {
        flex: "1 1 auto"
    }
}
  , Jt = {
    key: 0,
    class: "pa-2",
    style: {
        "border-top": "1px solid var(--c-line-color)"
    }
}
  , Zt = {
    class: "d-flex align-center text-primary font-weight-medium"
}
  , Qt = {
    class: "pl-2",
    style: {
        flex: "1 1 auto"
    }
}
  , Xt = {
    style: {
        flex: "0 0 auto"
    }
}
  , eo = {
    class: "d-sr-only"
}
  , to = {
    style: {
        flex: "1 1 auto"
    }
}
  , oo = {
    class: "text-right d-print-none",
    style: {
        flex: "1 1 auto"
    }
};
function io(t, l, b, A, c, a) {
    const _ = r("v-icon")
      , h = r("v-btn")
      , S = r("banner-left")
      , $ = r("banner-center")
      , p = r("v-list-item-title")
      , u = r("v-list-item")
      , O = r("v-list")
      , V = r("v-menu")
      , x = r("v-toolbar-items")
      , L = r("v-app-bar")
      , y = r("v-list-group")
      , F = r("c-btn")
      , Z = r("v-divider")
      , Q = r("navigation-bottom")
      , X = r("v-navigation-drawer")
      , ee = r("router-view")
      , te = r("v-main")
      , oe = r("router-link")
      , ie = r("v-footer")
      , ae = r("page-help-popup")
      , le = r("server-error-popup")
      , se = r("server-validation-error-popup")
      , ne = r("kiosk-details-popup")
      , re = r("inactivity-popup")
      , de = r("work-on-behalf-of-popup")
      , ce = r("c-snackbar")
      , pe = r("c-blocker")
      , ue = r("c-confirm")
      , fe = r("v-app");
    return d(),
    f(fe, null, {
        default: e( () => [o(L, {
            density: "compact",
            elevation: "2",
            id: "header-toolbar",
            class: "d-print-none js-app-header",
            color: t.$vuetify.theme.isDark ? "" : "white"
        }, {
            default: e( () => [n("div", {
                style: G(c.skipLinks ? "flex: 0 0 100%" : "")
            }, [n("div", Lt, [n("button", {
                class: "d-sr-only-focusable",
                type: "button",
                onClick: l[0] || (l[0] = (...m) => a.focusTitle && a.focusTitle(...m)),
                onFocus: l[1] || (l[1] = m => {
                    c.skipLinks = !0
                }
                ),
                onBlur: l[2] || (l[2] = m => {
                    c.skipLinks = !1
                }
                )
            }, i(t.$t("application.banner.skipLink")), 33)])], 4), n("div", {
                class: "d-flex align-center",
                style: G({
                    flex: a.largeDisplay ? "1 1 25%" : "0 0 auto"
                })
            }, [n("div", Bt, [o(h, {
                variant: "text",
                color: "primary",
                style: {
                    "min-width": "auto",
                    height: "100%"
                },
                onClick: l[3] || (l[3] = m => c.drawer = !c.drawer)
            }, {
                default: e( () => [o(_, {
                    style: {
                        "font-size": "24px"
                    }
                }, {
                    default: e( () => [s(" mdi-menu ")]),
                    _: 1
                }), n("span", Ht, i(t.$t("application.banner.toggleMainMenu")), 1)]),
                _: 1
            })]), o(S)], 4), o($), o(x, {
                class: "d-none d-md-block text-right",
                style: {
                    flex: "1 1 25%"
                }
            }, {
                default: e( () => [a.hasSession ? (d(),
                f(V, {
                    key: 0
                }, {
                    activator: e( ({props: m}) => [o(h, K({
                        variant: "text",
                        class: "ma-0"
                    }, m, {
                        color: "primary"
                    }), {
                        default: e( () => [n("div", Rt, i(a.effectiveUserDisplayName), 1)]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(O, {
                        density: "compact"
                    }, {
                        default: e( () => [o(u, {
                            to: {
                                name: "user-profile"
                            },
                            active: !1
                        }, {
                            default: e( () => [o(p, null, {
                                default: e( () => [s(i(t.$t("application.banner.user.profile")), 1)]),
                                _: 1
                            })]),
                            _: 1
                        }), a.isEnabledSupportStaffFunctions && a.isUserAssociatedToOrg && a.isUserSupportStaffForAnAttorney ? (d(),
                        f(u, {
                            key: 0,
                            active: !1,
                            onClick: l[4] || (l[4] = m => c.workOnBehalfOfPopupVisible = !0)
                        }, {
                            default: e( () => [o(p, null, {
                                default: e( () => [s(i(t.$t("application.banner.user.workOnBehalfOf")), 1)]),
                                _: 1
                            })]),
                            _: 1
                        })) : v("", !0), o(u, {
                            onClick: a.redirectToLogout
                        }, {
                            default: e( () => [o(p, null, {
                                default: e( () => [s(i(t.$t("application.banner.user.logout")), 1)]),
                                _: 1
                            })]),
                            _: 1
                        }, 8, ["onClick"])]),
                        _: 1
                    })]),
                    _: 1
                })) : (d(),
                g(D, {
                    key: 1
                }, [a.isKioskMode ? v("", !0) : (d(),
                f(h, {
                    key: 0,
                    variant: "text",
                    color: "primary",
                    onClick: a.redirectToLogin
                }, {
                    default: e( () => [s(i(t.$t("application.banner.login")) + " / " + i(t.$t("application.banner.register")), 1)]),
                    _: 1
                }, 8, ["onClick"])), o(h, {
                    variant: "text",
                    color: "primary",
                    to: {
                        name: "language"
                    }
                }, {
                    default: e( () => [s(i(t.$t("application.banner.language")), 1)]),
                    _: 1
                })], 64)), a.hasSession && a.isEnableDocumentPurchaseFunctions ? (d(),
                f(h, {
                    key: 2,
                    variant: "text",
                    color: "primary",
                    class: "mw-auto",
                    to: {
                        name: "cart"
                    },
                    active: !1
                }, {
                    default: e( () => [o(_, {
                        style: {
                            "font-size": "24px"
                        }
                    }, {
                        default: e( () => [s(" mdi-cart ")]),
                        _: 1
                    }), a.hasUnpurchasedDocumentsInCart ? (d(),
                    f(_, {
                        key: 0,
                        size: "x-small",
                        color: "red-darken-1",
                        class: "mb-7 px-0"
                    }, {
                        default: e( () => [s(" mdi-circle ")]),
                        _: 1
                    })) : v("", !0), n("span", zt, i(t.$t("global.cart")), 1)]),
                    _: 1
                })) : v("", !0), o(V, null, {
                    activator: e( ({props: m}) => [o(h, K({
                        variant: "text",
                        color: "primary",
                        class: "mw-auto"
                    }, m), {
                        default: e( () => [o(_, {
                            style: {
                                "font-size": "24px"
                            }
                        }, {
                            default: e( () => [s(" mdi-help-circle ")]),
                            _: 1
                        }), n("span", Ft, i(t.$t("global.help")), 1)]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(O, {
                        density: "compact"
                    }, {
                        default: e( () => [o(u, {
                            active: !1,
                            onClick: l[5] || (l[5] = m => c.pageHelpPopupVisible = !0)
                        }, {
                            default: e( () => [o(p, null, {
                                default: e( () => [s(i(t.$t("application.banner.pageHelp")), 1)]),
                                _: 1
                            })]),
                            _: 1
                        }), o(u, {
                            to: {
                                name: "about"
                            },
                            active: !1
                        }, {
                            default: e( () => [o(p, null, {
                                default: e( () => [s(i(t.$t("application.banner.about")), 1)]),
                                _: 1
                            })]),
                            _: 1
                        })]),
                        _: 1
                    })]),
                    _: 1
                })]),
                _: 1
            })]),
            _: 1
        }, 8, ["color"]), n("div", Gt, [n("div", Kt, i(t.$t("application.project.name")), 1), a.hasSession ? (d(),
        g("div", qt, i(a.effectiveUserDisplayName), 1)) : v("", !0)]), n("div", jt, [o(X, {
            id: "main-navigation",
            modelValue: c.drawer,
            "onUpdate:modelValue": l[10] || (l[10] = m => c.drawer = m),
            permanent: a.largeDisplay
        }, {
            append: e( () => [a.isKioskMode ? (d(),
            g("div", Jt, [n("div", Zt, [n("div", Qt, [n("div", null, i(t.$t("kioskMode.activeBanner")), 1)]), n("div", Xt, [o(h, {
                size: "small",
                icon: "",
                variant: "text",
                onClick: l[9] || (l[9] = m => c.kioskDetailsPopupVisible = !0)
            }, {
                default: e( () => [o(_, {
                    size: "x-large"
                }, {
                    default: e( () => [s(" mdi-information ")]),
                    _: 1
                }), n("span", eo, i(t.$t("kioskMode.activeBanner.details")), 1)]),
                _: 1
            })])])])) : v("", !0)]),
            default: e( () => [o(O, {
                nav: "",
                density: "comfortable",
                tag: "nav",
                "open-strategy": "multiple"
            }, {
                default: e( () => [a.smallOrDownDisplay ? (d(),
                g(D, {
                    key: 0
                }, [a.hasSession ? (d(),
                f(y, {
                    key: 0
                }, {
                    activator: e( ({props: m}) => [o(u, T(I(m)), {
                        prepend: e( () => [o(_, {
                            size: "large"
                        }, {
                            default: e( () => [s(" mdi-account ")]),
                            _: 1
                        })]),
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(a.effectiveUserDisplayName), 1)]),
                            _: 1
                        })]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(u, {
                        to: {
                            name: "user-profile"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.banner.user.profile")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), a.isEnabledSupportStaffFunctions && a.isUserAssociatedToOrg && a.isUserSupportStaffForAnAttorney ? (d(),
                    f(u, {
                        key: 0,
                        active: !1,
                        onClick: l[6] || (l[6] = m => c.workOnBehalfOfPopupVisible = !0)
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.banner.user.workOnBehalfOf")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })) : v("", !0), o(u, {
                        onClick: a.redirectToLogout
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.banner.user.logout")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }, 8, ["onClick"])]),
                    _: 1
                })) : a.isKioskMode ? v("", !0) : (d(),
                f(F, {
                    key: 1,
                    block: "",
                    type: "primary",
                    onClick: a.redirectToLogin
                }, {
                    default: e( () => [s(i(t.$t("application.banner.login")) + " / " + i(t.$t("application.banner.register")), 1)]),
                    _: 1
                }, 8, ["onClick"])), o(Z, {
                    class: "my-2 mx-1"
                })], 64)) : v("", !0), o(u, {
                    to: {
                        name: "home"
                    },
                    active: !1
                }, {
                    prepend: e( () => [o(_, {
                        size: "large"
                    }, {
                        default: e( () => [s(" mdi-home ")]),
                        _: 1
                    })]),
                    default: e( () => [o(p, null, {
                        default: e( () => [s(i(t.$t("application.navigation.home")), 1)]),
                        _: 1
                    })]),
                    _: 1
                }), o(u, {
                    to: {
                        name: "announcements"
                    },
                    active: !1
                }, {
                    prepend: e( () => [o(_, {
                        size: "large"
                    }, {
                        default: e( () => [s(" mdi-bullhorn ")]),
                        _: 1
                    })]),
                    default: e( () => [o(p, {
                        class: "d-flex align-center"
                    }, {
                        default: e( () => [n("div", Wt, i(t.$t("application.navigation.announcements")), 1), a.hasUnreadAnnouncements ? (d(),
                        f(_, {
                            key: 0,
                            size: "small",
                            color: "red-darken-1",
                            class: "pr-1"
                        }, {
                            default: e( () => [s(" mdi-circle ")]),
                            _: 1
                        })) : v("", !0)]),
                        _: 1
                    })]),
                    _: 1
                }), a.hasSession ? (d(),
                f(u, {
                    key: 1,
                    to: {
                        name: "work-notifications"
                    },
                    active: !1
                }, {
                    prepend: e( () => [o(_, {
                        size: "large"
                    }, {
                        default: e( () => [s(" mdi-bell ")]),
                        _: 1
                    })]),
                    default: e( () => [o(p, {
                        class: "d-flex align-center"
                    }, {
                        default: e( () => [n("div", Yt, i(t.$t("application.navigation.work.notifications")), 1), a.hasUnreadNotifications ? (d(),
                        f(_, {
                            key: 0,
                            size: "small",
                            color: "red-darken-1",
                            class: "pr-1"
                        }, {
                            default: e( () => [s(" mdi-circle ")]),
                            _: 1
                        })) : v("", !0)]),
                        _: 1
                    })]),
                    _: 1
                })) : v("", !0), o(u, {
                    to: {
                        name: "searchHome"
                    },
                    active: !1
                }, {
                    prepend: e( () => [o(_, {
                        size: "large"
                    }, {
                        default: e( () => [s(" mdi-magnify ")]),
                        _: 1
                    })]),
                    default: e( () => [o(p, null, {
                        default: e( () => [s(i(t.$t("application.navigation.search")), 1)]),
                        _: 1
                    })]),
                    _: 1
                }), a.isOrgAdmin ? (d(),
                f(u, {
                    key: 2,
                    to: {
                        name: "my-organization"
                    },
                    active: !1
                }, {
                    prepend: e( () => [o(_, {
                        size: "large"
                    }, {
                        default: e( () => [s(" mdi-office-building ")]),
                        _: 1
                    })]),
                    default: e( () => [o(p, null, {
                        default: e( () => [s(i(t.$t("application.navigation.manageOrg")), 1)]),
                        _: 1
                    })]),
                    _: 1
                })) : v("", !0), a.isAdmin ? (d(),
                f(y, {
                    key: 3
                }, {
                    activator: e( ({props: m}) => [o(u, T(I(m)), {
                        prepend: e( () => [o(_, {
                            size: "large"
                        }, {
                            default: e( () => [s(" mdi-security ")]),
                            _: 1
                        })]),
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration")), 1)]),
                            _: 1
                        })]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(u, {
                        to: {
                            name: "admin-search-user"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.user.search")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "admin-notifications"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.notifications.search")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), a.isEnableSubscriptionFunctions ? (d(),
                    f(u, {
                        key: 0,
                        to: {
                            name: "admin-subscriptions"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.subscriptions")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })) : v("", !0), o(u, {
                        to: {
                            name: "admin-kiosk-mode"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("kioskMode.title")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "admin-configuration"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.configuration")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "admin-message-errors"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.messageErrors")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "admin-receipts"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.receipts")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "admin-organizations"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.administration.organizations")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })]),
                    _: 1
                })) : v("", !0), a.hasSession ? (d(),
                f(y, {
                    key: 4
                }, {
                    activator: e( ({props: m}) => [o(u, T(I(m)), {
                        prepend: e( () => [o(_, {
                            size: "large"
                        }, {
                            default: e( () => [s(" mdi-briefcase ")]),
                            _: 1
                        })]),
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.work")), 1)]),
                            _: 1
                        })]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(u, {
                        to: {
                            name: "work-cases"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.work.cases")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "work-hearings"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.work.hearings")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), a.isInterpreter ? (d(),
                    f(u, {
                        key: 0,
                        to: {
                            name: "work-tasks"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.work.tasks")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })) : v("", !0), a.isInterpreter ? (d(),
                    f(u, {
                        key: 1,
                        to: {
                            name: "work-invites"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.work.invites")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })) : v("", !0), a.isEnableDocumentPurchaseFunctions ? (d(),
                    f(u, {
                        key: 2,
                        to: {
                            name: "work-purchased-documents"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.work.myPurchasedDocuments")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })) : v("", !0)]),
                    _: 1
                })) : v("", !0), a.isKioskMode ? v("", !0) : (d(),
                f(y, {
                    key: 5
                }, {
                    activator: e( ({props: m}) => [o(u, T(I(m)), {
                        prepend: e( () => [o(_, {
                            size: "large"
                        }, {
                            default: e( () => [s(" mdi-pencil-plus ")]),
                            _: 1
                        })]),
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.create")), 1)]),
                            _: 1
                        })]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(u, {
                        onClick: l[7] || (l[7] = m => c.UserAccess.forwardToRequestAccess(t.CONST.USER_TYPE_PUBLIC)),
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.navigation.create.requestCaseAccess")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })]),
                    _: 1
                })), a.smallOrDownDisplay ? (d(),
                g(D, {
                    key: 6
                }, [a.hasSession ? v("", !0) : (d(),
                f(u, {
                    key: 0,
                    to: {
                        name: "language"
                    },
                    active: !1
                }, {
                    prepend: e( () => [o(_, {
                        size: "large"
                    }, {
                        default: e( () => [s(" mdi-earth ")]),
                        _: 1
                    })]),
                    default: e( () => [o(p, null, {
                        default: e( () => [s(i(t.$t("application.banner.language")), 1)]),
                        _: 1
                    })]),
                    _: 1
                })), o(y, null, {
                    activator: e( ({props: m}) => [o(u, T(I(m)), {
                        prepend: e( () => [o(_, {
                            size: "large"
                        }, {
                            default: e( () => [s(" mdi-help-circle ")]),
                            _: 1
                        })]),
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("global.help")), 1)]),
                            _: 1
                        })]),
                        _: 2
                    }, 1040)]),
                    default: e( () => [o(u, {
                        active: !1,
                        onClick: l[8] || (l[8] = m => c.pageHelpPopupVisible = !0)
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.banner.pageHelp")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    }), o(u, {
                        to: {
                            name: "about"
                        },
                        active: !1
                    }, {
                        default: e( () => [o(p, null, {
                            default: e( () => [s(i(t.$t("application.banner.about")), 1)]),
                            _: 1
                        })]),
                        _: 1
                    })]),
                    _: 1
                })], 64)) : v("", !0)]),
                _: 1
            }), o(Q)]),
            _: 1
        }, 8, ["modelValue", "permanent"])]), o(te, {
            id: "main-content"
        }, {
            default: e( () => [o(ee, {
                class: "px-2"
            }, {
                default: e( ({Component: m}) => [o(ge, {
                    name: "scroll-x-reverse-transition",
                    mode: "out-in",
                    appear: ""
                }, {
                    default: e( () => [(d(),
                    f(ke(m), {
                        key: a.routerViewKey
                    }))]),
                    _: 2
                }, 1024)]),
                _: 1
            })]),
            _: 1
        }), o(ie, {
            id: "footer-content",
            class: "align-center",
            app: "",
            inset: "",
            absolute: ""
        }, {
            default: e( () => [n("div", to, [n("div", null, i(t.$t("application.application.name")), 1), n("div", null, i(t.$t("application.createdBy.name")), 1)]), n("div", oo, [o(oe, {
                to: {
                    name: "site-map"
                }
            }, {
                default: e( () => [s(i(t.$t("global.siteMap")), 1)]),
                _: 1
            })])]),
            _: 1
        }), o(ae, {
            modelValue: c.pageHelpPopupVisible,
            "onUpdate:modelValue": l[11] || (l[11] = m => c.pageHelpPopupVisible = m)
        }, null, 8, ["modelValue"]), o(le), o(se), o(ne, {
            modelValue: c.kioskDetailsPopupVisible,
            "onUpdate:modelValue": l[12] || (l[12] = m => c.kioskDetailsPopupVisible = m)
        }, null, 8, ["modelValue"]), o(re), o(de, {
            modelValue: c.workOnBehalfOfPopupVisible,
            "onUpdate:modelValue": l[13] || (l[13] = m => c.workOnBehalfOfPopupVisible = m)
        }, null, 8, ["modelValue"]), o(ce), o(pe), o(ue)]),
        _: 1
    })
}
const po = E(Mt, [["render", io]]);
export {po as default};
