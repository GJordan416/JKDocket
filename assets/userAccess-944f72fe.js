import {u as m, a1 as t, Z as a, D as i, d as o, a2 as l, e as c, I as f} from "./index-c903cc1f.js";
class q {
    getUserAccessConfig(e) {
        return {
            requireAddress: !0,
            requireContactPhone: !0,
            requireFile: !0,
            requireComments: !1
        }
    }
    forwardToRequestAccess(e, r={}) {
        const s = m();
        if (!s.hasSession) {
            t.notify({
                color: "warning",
                message: a.global.t("page.requestAccess.warning.mustBeLoggedIn")
            });
            return
        }
        if (e === i.USER_TYPE_PUBLIC)
            s.isWorkingOnBehalfOf && (o.isNil(s.onBehalfOfAttorneyUser.mailingAddress) || o.isNil(s.onBehalfOfAttorneyUser.contactPhoneNumber)) ? t.notify({
                message: a.global.t("validation.supportStaffUser.caseAccessRequest.noInformation"),
                color: "error"
            }) : l.push({
                name: "requestAccess",
                params: {
                    userTypeID: e
                },
                query: {
                    ...r
                }
            });
        else {
            let n = {
                userTypeID: e,
                userRequestStatusID: i.USER_REQUEST_STATUS_PENDING
            };
            c.get(t.getAPI({
                name: "api.user.requests",
                query: n
            })).then(u => {
                o.get(u, "data._embedded.results", []).length > 0 ? t.notify({
                    color: "warning",
                    message: a.global.t("page.requestAccess.warning.alreadyRequested")
                }) : l.push({
                    name: "requestAccess",
                    params: {
                        userTypeID: e
                    },
                    query: {
                        ...r
                    }
                })
            }
            )
        }
    }
    submitRequest({file: e, bean: r}) {
        t.blockNow();
        let s = null
          , n = Promise.resolve();
        e !== null && (n = f(i.SYSTEM_TABLE_USER_REQUEST, "User Request", e).then(u => {
            s = u
        }
        )),
        n.then( () => (o.isNil(s) || (r.documentLinkID = s),
        c.post(t.getAPI({
            name: "api.user.requests"
        }), r).then( () => {
            t.notify({
                message: a.global.t("application.save.success"),
                color: "success"
            }),
            l.push({
                name: "user-profile"
            })
        }
        ))).finally( () => {
            t.unblock()
        }
        )
    }
}
class d extends q {
}
const U = new d;
export {U};
