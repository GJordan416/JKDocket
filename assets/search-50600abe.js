import {D as i, a1 as n, b as N, E as f, Z as r, d as l, J as s, K as d} from "./index-c903cc1f.js";
import {J as E} from "./index-d38d639c.js";
class C {
    getValidSearchTypes() {
        return [i.SEARCH_TYPE_CASE, i.SEARCH_TYPE_PARTY, i.SEARCH_TYPE_CITATION, i.SEARCH_TYPE_JUDGMENT, i.SEARCH_TYPE_CALENDAR, i.SEARCH_TYPE_DOCUMENT, i.SEARCH_TYPE_PUBLICATION]
    }
    getSupportedAdvancedSearchTypes() {
        return [i.SEARCH_TYPE_CASE, i.SEARCH_TYPE_PARTY, i.SEARCH_TYPE_CITATION, i.SEARCH_TYPE_JUDGMENT, i.SEARCH_TYPE_CALENDAR, i.SEARCH_TYPE_DOCUMENT]
    }
    getSearchConfigBySearchType(a) {
        let e = null;
        return a === i.SEARCH_TYPE_CASE ? e = {
            apiName: "api.search.cases"
        } : a === i.SEARCH_TYPE_PARTY ? e = {
            apiName: "api.search.parties"
        } : a === i.SEARCH_TYPE_CITATION ? e = {
            apiName: "api.search.citations"
        } : a === i.SEARCH_TYPE_JUDGMENT ? e = {
            apiName: "api.search.judgments"
        } : a === i.SEARCH_TYPE_CALENDAR ? e = {
            apiName: "api.search.events"
        } : a === i.SEARCH_TYPE_DOCUMENT ? e = {
            apiName: "api.search.documents"
        } : a === i.SEARCH_TYPE_PUBLICATION && (e = {
            apiName: "api.search.publications"
        }),
        e
    }
    getIconBySearchType(a) {
        let e = "mdi-magnify";
        return a === i.SEARCH_TYPE_CASE ? e = "mdi-folder-open" : a === i.SEARCH_TYPE_PARTY ? e = "mdi-account-group" : a === i.SEARCH_TYPE_CITATION ? e = "mdi-card-bulleted" : a === i.SEARCH_TYPE_JUDGMENT ? e = "mdi-scale-balance" : a === i.SEARCH_TYPE_CALENDAR ? e = "mdi-calendar-month" : a === i.SEARCH_TYPE_DOCUMENT ? e = "mdi-file-document" : a === i.SEARCH_TYPE_PUBLICATION && (e = "mdi-file-sign"),
        e
    }
    generateSearchDTO(a) {
        let e = !0
          , t = {
            advanced: !1,
            courtID: null,
            paging: new n.SpringPaging
        };
        return a === i.SEARCH_TYPE_PARTY ? t[i.SEARCH_TYPE_PARTY] = {
            partyName: null,
            partyNameQueryTypeID: null,
            partyFirstName: null,
            partyFirstNameQueryTypeID: null,
            partyLastName: null,
            partyLastNameQueryTypeID: null,
            partySubtypeID: null,
            actorCategoryID: null,
            representationActorTypeID: i.ACTOR_TYPE_ATTORNEY,
            attorney: null,
            legalOrganization: null
        } : a === i.SEARCH_TYPE_CITATION ? t[i.SEARCH_TYPE_CITATION] = {
            citationNumber: null,
            citationNumberQueryTypeID: null,
            partyName: null,
            partyNameQueryTypeID: null,
            partyFirstName: null,
            partyFirstNameQueryTypeID: null,
            partyLastName: null,
            partyLastNameQueryTypeID: null,
            actorCategoryID: null,
            violationDateChoice: null,
            violationDateStart: null,
            violationDateEnd: null
        } : a === i.SEARCH_TYPE_JUDGMENT ? t[i.SEARCH_TYPE_JUDGMENT] = {
            forActorCategoryID: null,
            forPartyName: null,
            forPartyNameQueryTypeID: null,
            forPartyFirstName: null,
            forPartyFirstNameQueryTypeID: null,
            forPartyLastName: null,
            forPartyLastNameQueryTypeID: null,
            againstActorCategoryID: null,
            againstPartyName: null,
            againstPartyNameQueryTypeID: null,
            againstPartyFirstName: null,
            againstPartyFirstNameQueryTypeID: null,
            againstPartyLastName: null,
            againstPartyLastNameQueryTypeID: null,
            judgmentTypeID: null,
            judgmentStatusID: null,
            judgmentDateChoice: null,
            judgmentDateStart: null,
            judgmentDateEnd: null
        } : a === i.SEARCH_TYPE_CALENDAR ? (e = !1,
        t[i.SEARCH_TYPE_CALENDAR] = {
            locationID: null,
            departmentActorInstanceUUID: null,
            calendarName: null,
            calendarNameQueryTypeID: null,
            judgeName: null,
            judgeNameQueryTypeID: null,
            judgeFirstName: null,
            judgeFirstNameQueryTypeID: null,
            judgeLastName: null,
            judgeLastNameQueryTypeID: null,
            courtSessionTypeID: null,
            calendarDateChoice: null,
            calendarDateStart: null,
            calendarDateEnd: null
        }) : a === i.SEARCH_TYPE_DOCUMENT ? t[i.SEARCH_TYPE_DOCUMENT] = {
            docketEntrySubTypeID: null,
            textAnyWords: null,
            textAllWords: null,
            textExactPhrase: null,
            textNoneWords: null,
            docketEntryFiledDateChoice: null,
            docketEntryFiledDateStart: null,
            docketEntryFiledDateEnd: null
        } : a === i.SEARCH_TYPE_PUBLICATION && (e = !1,
        t[i.SEARCH_TYPE_PUBLICATION] = {
            caseNumber: null,
            publicationNumber: null,
            publicationName: null,
            publicationTitle: null,
            publicationDateChoice: null,
            publicationDateStart: null,
            publicationDateEnd: null
        }),
        e && (t[i.SEARCH_TYPE_CASE] = {
            locationID: null,
            caseCategoryID: null,
            caseTypeID: null,
            caseSubTypeID: null,
            caseNumber: null,
            caseNumberQueryTypeID: null,
            caseTitle: null,
            caseTitleQueryTypeID: null,
            originatingCourtCaseNumber: null,
            originatingCourtCaseNumberQueryTypeID: null,
            filedDateChoice: null,
            filedDateStart: null,
            filedDateEnd: null,
            excludeClosed: !1
        }),
        t
    }
    setSearchDefaults(a, e) {
        const t = N();
        e.courtID = t.getDefaultCourtID,
        a === i.SEARCH_TYPE_CASE ? (e.case.excludeClosed = !0,
        e.paging.sortBy = "caseHeader.filedDate",
        e.paging.sortDesc = !0,
        e.case.caseNumberQueryTypeID = i.QUERY_TYPE_CONTAINS,
        e.case.caseTitleQueryTypeID = this.getDefaultQueryType(!1),
        e.case.originatingCourtCaseNumberQueryTypeID = i.QUERY_TYPE_CONTAINS) : a === i.SEARCH_TYPE_PARTY ? (e.case.excludeClosed = !0,
        e.party.partyNameQueryTypeID = this.getDefaultQueryType(!1),
        e.paging.sortBy = "score",
        e.paging.sortDesc = !0) : a === i.SEARCH_TYPE_CITATION ? (e.case.excludeClosed = !0,
        e.paging.sortBy = "violationDate",
        e.paging.sortDesc = !0,
        e.citation.partyNameQueryTypeID = this.getDefaultQueryType(!1),
        e.citation.citationNumberQueryTypeID = i.QUERY_TYPE_CONTAINS) : a === i.SEARCH_TYPE_JUDGMENT ? (e.case.excludeClosed = !0,
        e.paging.sortBy = "judgmentDate",
        e.paging.sortDesc = !0,
        e.judgment.forPartyNameQueryTypeID = this.getDefaultQueryType(!1),
        e.judgment.againstPartyNameQueryTypeID = this.getDefaultQueryType(!1)) : a === i.SEARCH_TYPE_DOCUMENT ? e.case.excludeClosed = !0 : a === i.SEARCH_TYPE_CALENDAR ? (e.calendar.calendarDateChoice = "1m",
        e.calendar.calendarDateStart = n.formatDate(f.local()),
        e.calendar.calendarDateEnd = n.formatDate(f.local().plus({
            months: 1
        })),
        e.paging.sortBy = "startDate",
        e.paging.sortDesc = !0,
        e.calendar.calendarNameQueryTypeID = this.getDefaultQueryType(!1),
        e.calendar.judgeNameQueryTypeID = this.getDefaultQueryType(!1)) : a === i.SEARCH_TYPE_PUBLICATION && (e.paging.sortBy = "publicationDate",
        e.paging.sortDesc = !0)
    }
    getSearchResultHeaders(a) {
        let e = [];
        const t = N();
        let o = t.isSingleCourtMode;
        return !o && a !== i.SEARCH_TYPE_CALENDAR && a !== i.SEARCH_TYPE_PUBLICATION && e.push({
            id: "courtAbbreviation",
            text: r.global.t("courtCase.court"),
            value: "caseHeader.courtAbbreviation",
            sortable: !0
        }),
        a === i.SEARCH_TYPE_CASE ? (t.isSingleCaseLocationMode || e.push({
            id: "location",
            text: r.global.t("page.searchResults.case.location"),
            value: "caseHeader.location",
            sortable: !0
        }),
        e.push({
            id: "caseNumber",
            text: r.global.t("page.searchResults.case.caseNumber"),
            value: "caseHeader.caseNumber",
            sortable: !0
        }),
        e.push({
            id: "caseTitle",
            text: r.global.t("page.searchResults.case.caseTitle"),
            value: "caseHeader.caseTitle",
            sortable: !0
        }),
        e.push({
            id: "caseClassification",
            text: r.global.t("page.searchResults.case.classification"),
            value: "caseHeader.caseClassification",
            sortable: !0
        }),
        e.push({
            id: "filedDate",
            text: r.global.t("page.searchResults.case.filedDate"),
            value: "caseHeader.filedDate",
            sortable: !0
        }),
        e.push({
            id: "closedFlag",
            text: r.global.t("page.searchResults.case.open"),
            value: "caseHeader.closedFlag",
            sortable: !0
        })) : a === i.SEARCH_TYPE_PARTY ? (e.push({
            id: "caseNumber",
            text: r.global.t("page.searchResults.case.caseNumber"),
            value: "caseHeader.caseNumber",
            sortable: !0
        }),
        e.push({
            id: "caseTitle",
            text: r.global.t("page.searchResults.case.caseTitle"),
            value: "caseHeader.caseTitle",
            sortable: !0
        }),
        e.push({
            id: "caseCategory",
            text: r.global.t("page.searchResults.case.category"),
            value: "caseHeader.caseCategory",
            sortable: !0
        }),
        e.push({
            id: "filedDate",
            text: r.global.t("page.searchResults.case.filedDate"),
            value: "caseHeader.filedDate",
            sortable: !0
        }),
        e.push({
            id: "partySubType",
            text: r.global.t("page.searchResults.party.role"),
            value: "partyHeader.partySubType",
            sortable: !0
        }),
        e.push({
            id: "partyActorInstance",
            text: r.global.t("page.searchResults.party.name"),
            value: "partyHeader.partyActorInstance.sortName",
            sortable: !0
        }),
        e.push({
            id: "closedFlag",
            text: r.global.t("page.searchResults.case.open"),
            value: "caseHeader.closedFlag",
            sortable: !0
        })) : a === i.SEARCH_TYPE_CITATION ? (e.push({
            id: "caseNumber",
            text: r.global.t("page.searchResults.case.caseNumber"),
            value: "caseHeader.caseNumber",
            sortable: !0
        }),
        e.push({
            id: "caseTitle",
            text: r.global.t("page.searchResults.case.caseTitle"),
            value: "caseHeader.caseTitle",
            sortable: !0
        }),
        e.push({
            id: "citationNumber",
            text: r.global.t("page.searchResults.citation.number"),
            value: "citationNumber",
            sortable: !0
        }),
        e.push({
            id: "violationDate",
            text: r.global.t("page.searchResults.citation.date"),
            value: "violationDate",
            sortable: !0
        }),
        e.push({
            id: "partyActorInstance",
            text: r.global.t("page.searchResults.citation.party"),
            value: "defendantParty.partyActorInstance.sortName",
            sortable: !0
        }),
        e.push({
            id: "citingAgencyActorInstance",
            text: r.global.t("page.searchResults.citation.agency"),
            value: "citingAgencyActorInstance.sortName",
            sortable: !0
        })) : a === i.SEARCH_TYPE_JUDGMENT ? (e.push({
            id: "caseNumber",
            text: r.global.t("page.searchResults.case.caseNumber"),
            value: "caseHeader.caseNumber",
            sortable: !0
        }),
        e.push({
            id: "caseTitle",
            text: r.global.t("page.searchResults.case.caseTitle"),
            value: "caseHeader.caseTitle",
            sortable: !0
        }),
        e.push({
            id: "judgmentDate",
            text: r.global.t("page.searchResults.judgment.date"),
            value: "judgmentDate",
            sortable: !0
        }),
        e.push({
            id: "judgmentType",
            text: r.global.t("page.searchResults.judgment.type"),
            value: "judgmentType",
            sortable: !0
        }),
        e.push({
            id: "judgmentStatus",
            text: r.global.t("page.searchResults.judgment.status"),
            value: "judgmentStatus",
            sortable: !0
        }),
        e.push({
            id: "forParties",
            text: r.global.t("page.searchResults.judgment.for"),
            value: "forParties",
            sortable: !1
        }),
        e.push({
            id: "againstParties",
            text: r.global.t("page.searchResults.judgment.against"),
            value: "againstParties",
            sortable: !1
        }),
        e.push({
            id: "judgmentAmount",
            text: r.global.t("page.searchResults.judgment.amount"),
            value: "judgmentAmount",
            sortable: !0
        })) : a === i.SEARCH_TYPE_DOCUMENT ? (e.push({
            id: "caseNumber",
            text: r.global.t("page.searchResults.case.caseNumber"),
            value: "caseHeader.caseNumber",
            sortable: !0
        }),
        e.push({
            id: "caseTitle",
            text: r.global.t("page.searchResults.case.caseTitle"),
            value: "caseHeader.caseTitle",
            sortable: !0
        }),
        e.push({
            id: "caseCategory",
            text: r.global.t("page.searchResults.case.category"),
            value: "caseHeader.caseCategory",
            sortable: !0
        }),
        e.push({
            id: "docketEntryTypeName",
            text: r.global.t("page.searchResults.document.type"),
            value: "docketEntryHeader.docketEntryType",
            sortable: !0
        }),
        e.push({
            id: "docketEntryFiledDate",
            text: r.global.t("page.searchResults.document.filedDate"),
            value: "docketEntryHeader.filedDate",
            sortable: !0
        }),
        e.push({
            id: "documentName",
            text: r.global.t("page.searchResults.document.name"),
            value: "documentName",
            sortable: !0
        }),
        e.push({
            id: "highlightsMap",
            text: r.global.t("page.searchResults.document.text"),
            value: "highlightsMap",
            sortable: !1
        }),
        e.push({
            id: "view",
            text: r.global.t("global.view"),
            value: "documentLinkUUID",
            sortable: !1,
            align: "right"
        })) : a === i.SEARCH_TYPE_CALENDAR ? (o || e.push({
            id: "courtAbbreviation",
            text: r.global.t("courtCase.court"),
            value: "courtAbbreviation",
            sortable: !0
        }),
        e.push({
            id: "startDate",
            text: r.global.t("page.searchResults.calendar.date"),
            value: "startDate",
            sortable: !0
        }),
        e.push({
            id: "eventName",
            text: r.global.t("page.searchResults.calendar.calendarName"),
            value: "eventName",
            sortable: !0
        }),
        e.push({
            id: "courtSessionType",
            text: r.global.t("page.searchResults.calendar.type"),
            value: "courtSessionType",
            sortable: !0
        }),
        e.push({
            id: "location",
            text: r.global.t("page.searchResults.calendar.location"),
            value: "location",
            sortable: !0
        }),
        e.push({
            id: "room",
            text: r.global.t("page.searchResults.calendar.room"),
            value: "room",
            sortable: !0
        }),
        e.push({
            id: "departmentActorInstance",
            text: r.global.t("page.searchResults.calendar.department"),
            value: "departmentActorInstance.displayName",
            sortable: !0
        }),
        e.push({
            id: "judgeActorInstances",
            text: r.global.t("page.searchResults.calendar.assignment"),
            value: "judgeActorInstances",
            sortable: !1
        })) : a === i.SEARCH_TYPE_PUBLICATION && (o || e.push({
            id: "courtAbbreviation",
            text: r.global.t("courtCase.court"),
            value: "courtAbbreviation",
            sortable: !0
        }),
        e.push({
            id: "publicationDate",
            text: r.global.t("page.searchResults.publication.publicationDate"),
            value: "publicationDate",
            sortable: !0
        }),
        e.push({
            id: "publicationNumber",
            text: r.global.t("page.searchResults.publication.publicationNumber"),
            value: "publicationNumber",
            sortable: !0
        }),
        e.push({
            id: "publicationName",
            text: r.global.t("page.searchResults.publication.publicationName"),
            value: "publicationName",
            sortable: !0
        })),
        e
    }
    getAdditionalSorts(a) {
        let e = [];
        return (a === i.SEARCH_TYPE_PARTY || a === i.SEARCH_TYPE_DOCUMENT) && e.push({
            text: r.global.t("page.searchResults.sort.score"),
            value: "score",
            customSort: !0,
            sortExpression: () => null
        }),
        e
    }
    getDefaultQueryType(a) {
        let e = i.QUERY_TYPE_MATCH;
        return a && (e = i.QUERY_TYPE_CONTAINS),
        e
    }
    validateSearchCriteria(a, e) {
        return n.validation.clear(),
        e.case !== void 0 && e.case.filedDateChoice === i.DATE_RANGE_OPTION_CUSTOM && (n.validation.date.rejectIfInvalid(e.case.filedDateStart, "page.searchCriteria.case.field.caseFiledDateFrom", "caseFiledDate-startDate"),
        n.validation.date.rejectIfInvalid(e.case.filedDateEnd, "page.searchCriteria.case.field.caseFiledDateTo", "caseFiledDate-endDate"),
        n.validation.date.rejectIfBefore(e.case.filedDateEnd, e.case.filedDateStart, "page.searchCriteria.case.field.caseFiledDateTo", "page.searchCriteria.case.field.caseFiledDateFrom", "caseFiledDate-endDate")),
        a === i.SEARCH_TYPE_CALENDAR && e.calendar.calendarDateChoice === i.DATE_RANGE_OPTION_CUSTOM && (n.validation.date.rejectIfInvalid(e.calendar.calendarDateStart, "page.searchCriteria.calendar.field.dateFrom", "calendarDate-startDate"),
        n.validation.date.rejectIfInvalid(e.calendar.calendarDateEnd, "page.searchCriteria.calendar.field.dateTo", "calendarDate-endDate"),
        n.validation.date.rejectIfBefore(e.calendar.calendarDateEnd, e.calendar.calendarDateStart, "page.searchCriteria.calendar.field.dateTo", "page.searchCriteria.calendar.field.dateFrom", "calendarDate-endDate")),
        a === i.SEARCH_TYPE_CITATION && e.citation.violationDateChoice === i.DATE_RANGE_OPTION_CUSTOM && (n.validation.date.rejectIfInvalid(e.citation.violationDateStart, "page.searchCriteria.citation.field.violationDateFrom", "violationDate-startDate"),
        n.validation.date.rejectIfInvalid(e.citation.violationDateEnd, "page.searchCriteria.citation.field.violationDateTo", "violationDate-endDate"),
        n.validation.date.rejectIfBefore(e.citation.violationDateEnd, e.citation.violationDateStart, "page.searchCriteria.citation.field.violationDateTo", "page.searchCriteria.citation.field.violationDateFrom", "violationDate-endDate")),
        a === i.SEARCH_TYPE_DOCUMENT && e.document.docketEntryFiledDateChoice === i.DATE_RANGE_OPTION_CUSTOM && (n.validation.date.rejectIfInvalid(e.document.docketEntryFiledDateStart, "page.searchCriteria.document.field.filedDateFrom", "filedDate-startDate"),
        n.validation.date.rejectIfInvalid(e.document.docketEntryFiledDateEnd, "page.searchCriteria.document.field.filedDateTo", "filedDate-endDate"),
        n.validation.date.rejectIfBefore(e.document.docketEntryFiledDateEnd, e.document.docketEntryFiledDateStart, "page.searchCriteria.document.field.filedDateTo", "page.searchCriteria.document.field.filedDateFrom", "filedDate-endDate")),
        a === i.SEARCH_TYPE_JUDGMENT && e.judgment.judgmentDateChoice === i.DATE_RANGE_OPTION_CUSTOM && (n.validation.date.rejectIfInvalid(e.judgment.judgmentDateStart, "page.searchCriteria.judgment.field.judgmentDateFrom", "judgmentDate-startDate"),
        n.validation.date.rejectIfInvalid(e.judgment.judgmentDateEnd, "page.searchCriteria.judgment.field.judgmentDateTo", "judgmentDate-endDate"),
        n.validation.date.rejectIfBefore(e.judgment.judgmentDateEnd, e.judgment.judgmentDateStart, "page.searchCriteria.judgment.field.judgmentDateTo", "page.searchCriteria.judgment.field.judgmentDateFrom", "judgmentDate-endDate")),
        a === i.SEARCH_TYPE_PUBLICATION && e.publication.publicationDateChoice === i.DATE_RANGE_OPTION_CUSTOM && (n.validation.date.rejectIfInvalid(e.publication.publicationDateStart, "page.searchCriteria.publication.field.publicationDateFrom", "publicationDate-startDate"),
        n.validation.date.rejectIfInvalid(e.publication.publicationDateEnd, "page.searchCriteria.publication.field.publicationDateTo", "publicationDate-endDate"),
        n.validation.date.rejectIfBefore(e.publication.publicationDateEnd, e.publication.publicationDateStart, "page.searchCriteria.publication.field.publicationDateTo", "page.searchCriteria.publication.field.publicationDateFrom", "publicationDate-endDate")),
        !n.validation.hasErrors()
    }
    beforeInitialSearch(a, e) {
        a === i.SEARCH_TYPE_DOCUMENT && (e.paging.sortBy = "docketEntryHeader.filedDate",
        e.paging.sortDesc = !0,
        (!l.isNil(e.document.textAnyWords) || !l.isNil(e.document.textAllWords) || !l.isNil(e.document.textExactPhrase) || !l.isNil(e.document.textNoneWords)) && (e.paging.sortBy = "score",
        e.paging.sortDesc = !0))
    }
    generateAPIQueryObject(a, e) {
        var o, u, c, p, g, m;
        let t = {};
        if (a === i.SEARCH_TYPE_CASE && (l.isNil(e.case.locationID) || (t["caseHeader.locationID"] = e.case.locationID),
        l.isNil(e.case.caseCategoryID) || (t["caseHeader.caseCategoryID"] = e.case.caseCategoryID),
        l.isNil(e.case.caseTypeID) || (t["caseHeader.caseTypeID"] = e.case.caseTypeID),
        l.isNil(e.case.caseSubTypeID) || (t["caseHeader.caseSubTypeID"] = e.case.caseSubTypeID),
        l.isNil(e.case.caseNumber) || (t["caseHeader.caseNumber"] = e.case.caseNumber,
        t["caseHeader.caseNumberSearchType"] = e.case.caseNumberQueryTypeID),
        l.isNil(e.case.caseTitle) || (t["caseHeader.caseTitle"] = e.case.caseTitle,
        t["caseHeader.caseTitleSearchType"] = e.case.caseTitleQueryTypeID),
        l.isNil(e.case.originatingCourtCaseNumber) || (t["caseHeader.originatingCourtCases.originatingCaseNumber"] = e.case.originatingCourtCaseNumber,
        t["caseHeader.originatingCourtCases.originatingCaseNumberSearchType"] = e.case.originatingCourtCaseNumberQueryTypeID),
        l.isNil(e.case.filedDateStart) || (t["caseHeader.filedDateFrom"] = s(n.parseDate(e.case.filedDateStart)).toISO()),
        l.isNil(e.case.filedDateEnd) || (t["caseHeader.filedDateTo"] = d(n.parseDate(e.case.filedDateEnd)).toISO()),
        e.case.excludeClosed && (t["caseHeader.closedFlag"] = !1),
        l.isNil(e.courtID) || (t["caseHeader.courtID"] = e.courtID)),
        a === i.SEARCH_TYPE_PARTY && (l.isNil(e.party.partySubTypeID) || (t["partyHeader.partySubTypeID"] = e.party.partySubTypeID),
        l.isNil(e.party.actorCategoryID) || (t["partyHeader.partyActorInstance.actorCategoryID"] = e.party.actorCategoryID),
        l.isNil(e.party.partyName) ? e.party.actorCategoryID === i.ACTOR_CATEGORY_PERSON && (l.isNil(e.party.partyFirstName) || (t["partyHeader.partyActorInstance.firstName"] = e.party.partyFirstName,
        t["partyHeader.partyActorInstance.firstNameSearchType"] = e.party.partyFirstNameQueryTypeID),
        l.isNil(e.party.partyLastName) || (t["partyHeader.partyActorInstance.lastName"] = e.party.partyLastName,
        t["partyHeader.partyActorInstance.lastNameSearchType"] = e.party.partyLastNameQueryTypeID)) : (t["partyHeader.partyActorInstance.displayName"] = e.party.partyName,
        t["partyHeader.partyActorInstance.displayNameSearchType"] = e.party.partyNameQueryTypeID),
        l.isNil((c = (u = (o = e == null ? void 0 : e.party) == null ? void 0 : o.attorney) == null ? void 0 : u.actorHeader) == null ? void 0 : c.actorUUID) || (t["legalRepresentations.attorneyPartyHeader.partyActorInstance.actorUUID"] = e.party.attorney.actorHeader.actorUUID),
        l.isNil((m = (g = (p = e == null ? void 0 : e.party) == null ? void 0 : p.legalOrganization) == null ? void 0 : g.actorHeader) == null ? void 0 : m.actorUUID) || (t["legalRepresentations.legalOrganizationPartyHeader.partyActorInstance.actorUUID"] = e.party.legalOrganization.actorHeader.actorUUID),
        this.generateNestedCaseHeaderQueryCriteria(e, t)),
        a === i.SEARCH_TYPE_CITATION && (l.isNil(e.citation.citationNumber) || (t.citationNumber = e.citation.citationNumber,
        t.citationNumberSearchType = e.citation.citationNumberQueryTypeID),
        l.isNil(e.citation.violationDateStart) || (t.violationDateFrom = s(n.parseDate(e.citation.violationDateStart)).toISO()),
        l.isNil(e.citation.violationDateEnd) || (t.violationDateTo = d(n.parseDate(e.citation.violationDateEnd)).toISO()),
        l.isNil(e.citation.actorCategoryID) || (t["defendantParty.partyActorInstance.actorCategoryID"] = e.citation.actorCategoryID),
        l.isNil(e.citation.partyName) ? e.citation.actorCategoryID === i.ACTOR_CATEGORY_PERSON && (l.isNil(e.citation.partyFirstName) || (t["defendantParty.partyActorInstance.firstName"] = e.citation.partyFirstName,
        t["defendantParty.partyActorInstance.firstNameSearchType"] = e.citation.partyFirstNameQueryTypeID),
        l.isNil(e.citation.partyLastName) || (t["defendantParty.partyActorInstance.lastName"] = e.citation.partyLastName,
        t["defendantParty.partyActorInstance.lastNameSearchType"] = e.citation.partyLastNameQueryTypeID)) : (t["defendantParty.partyActorInstance.displayName"] = e.citation.partyName,
        t["defendantParty.partyActorInstance.displayNameSearchType"] = e.citation.partyNameQueryTypeID),
        this.generateNestedCaseHeaderQueryCriteria(e, t)),
        a === i.SEARCH_TYPE_JUDGMENT && (l.isNil(e.judgment.judgmentTypeID) || (t.judgmentTypeID = e.judgment.judgmentTypeID),
        l.isNil(e.judgment.judgmentStatusID) || (t.judgmentStatusID = e.judgment.judgmentStatusID),
        l.isNil(e.judgment.judgmentDateStart) || (t.judgmentDateFrom = s(n.parseDate(e.judgment.judgmentDateStart)).toISO()),
        l.isNil(e.judgment.judgmentDateEnd) || (t.judgmentDateTo = d(n.parseDate(e.judgment.judgmentDateEnd)).toISO()),
        l.isNil(e.judgment.forActorCategoryID) || (t["forParties.partyActorInstance.actorCategoryID"] = e.judgment.forActorCategoryID),
        l.isNil(e.judgment.forPartyName) ? e.judgment.forActorCategoryID === i.ACTOR_CATEGORY_PERSON && (l.isNil(e.judgment.forPartyFirstName) || (t["forParties.partyActorInstance.firstName"] = e.judgment.forPartyFirstName,
        t["forParties.partyActorInstance.firstNameSearchType"] = e.judgment.forPartyFirstNameQueryTypeID),
        l.isNil(e.judgment.forPartyLastName) || (t["forParties.partyActorInstance.lastName"] = e.judgment.forPartyLastName,
        t["forParties.partyActorInstance.lastNameSearchType"] = e.judgment.forPartyLastNameQueryTypeID)) : (t["forParties.partyActorInstance.displayName"] = e.judgment.forPartyName,
        t["forParties.partyActorInstance.displayNameSearchType"] = e.judgment.forPartyNameQueryTypeID),
        l.isNil(e.judgment.againstActorCategoryID) || (t["againstParties.partyActorInstance.actorCategoryID"] = e.judgment.againstActorCategoryID),
        l.isNil(e.judgment.againstPartyName) ? e.judgment.againstActorCategoryID === i.ACTOR_CATEGORY_PERSON && (l.isNil(e.judgment.againstPartyFirstName) || (t["againstParties.partyActorInstance.firstName"] = e.judgment.againstPartyFirstName,
        t["againstParties.partyActorInstance.firstNameSearchType"] = e.judgment.againstPartyFirstNameQueryTypeID),
        l.isNil(e.judgment.againstPartyLastName) || (t["againstParties.partyActorInstance.lastName"] = e.judgment.againstPartyLastName,
        t["againstParties.partyActorInstance.lastNameSearchType"] = e.judgment.againstPartyLastNameQueryTypeID)) : (t["againstParties.partyActorInstance.displayName"] = e.judgment.againstPartyName,
        t["againstParties.partyActorInstance.displayNameSearchType"] = e.judgment.againstPartyNameQueryTypeID),
        this.generateNestedCaseHeaderQueryCriteria(e, t)),
        a === i.SEARCH_TYPE_DOCUMENT) {
            if (!l.isNil(e.document.docketEntrySubTypeID)) {
                let y = this.parseDocketEntrySubTypeID(e.document.docketEntrySubTypeID);
                l.isNil(y.docketEntryTypeID) || (t["docketEntryHeader.docketEntryTypeID"] = y.docketEntryTypeID),
                l.isNil(y.docketEntrySubTypeID) || (t["docketEntryHeader.docketEntrySubTypeID"] = y.docketEntrySubTypeID)
            }
            l.isNil(e.document.docketEntryFiledDateStart) || (t["docketEntryHeader.docketEntryFiledDateFrom"] = s(n.parseDate(e.document.docketEntryFiledDateStart)).toISO()),
            l.isNil(e.document.docketEntryFiledDateEnd) || (t["docketEntryHeader.docketEntryFiledDateTo"] = d(n.parseDate(e.document.docketEntryFiledDateEnd)).toISO()),
            l.isNil(e.document.textAnyWords) || (t.anyOfTheseWords = e.document.textAnyWords),
            l.isNil(e.document.textAllWords) || (t.allOfTheseWords = e.document.textAllWords),
            l.isNil(e.document.textExactPhrase) || (t.thisExactPhrase = e.document.textExactPhrase),
            l.isNil(e.document.textNoneWords) || (t.noneOfTheseWords = e.document.textNoneWords),
            this.generateNestedCaseHeaderQueryCriteria(e, t)
        }
        return a === i.SEARCH_TYPE_CALENDAR && (l.isNil(e.calendar.locationID) || (t.locationID = e.calendar.locationID),
        l.isNil(e.calendar.courtSessionTypeID) || (t.courtSessionTypeID = e.calendar.courtSessionTypeID),
        l.isNil(e.calendar.calendarName) || (t.eventName = e.calendar.calendarName,
        t.eventNameSearchType = e.calendar.calendarNameQueryTypeID),
        l.isNil(e.calendar.calendarDateStart) || (t.startDateFrom = s(n.parseDate(e.calendar.calendarDateStart)).toISO()),
        l.isNil(e.calendar.calendarDateEnd) || (t.startDateTo = d(n.parseDate(e.calendar.calendarDateEnd)).toISO()),
        l.isNil(e.courtID) || (t.courtID = e.courtID),
        l.isNil(e.calendar.departmentActorInstanceUUID) || (t["departmentActorInstance.actorInstanceUUID"] = e.calendar.departmentActorInstanceUUID),
        l.isNil(e.calendar.judgeName) ? (l.isNil(e.calendar.judgeFirstName) || (t["judgeActorInstances.firstName"] = e.calendar.judgeFirstName,
        t["judgeActorInstances.firstNameSearchType"] = e.calendar.judgeFirstNameQueryTypeID),
        l.isNil(e.calendar.judgeLastName) || (t["judgeActorInstances.lastName"] = e.calendar.judgeLastName,
        t["judgeActorInstances.lastNameSearchType"] = e.calendar.judgeLastNameQueryTypeID)) : (t["judgeActorInstances.displayName"] = e.calendar.judgeName,
        t["judgeActorInstances.displayNameSearchType"] = e.calendar.judgeNameQueryTypeID)),
        a === i.SEARCH_TYPE_PUBLICATION && (l.isNil(e.courtID) || (t.courtID = e.courtID),
        l.isNil(e.publication.caseNumber) || (t.caseNumber = e.publication.caseNumber),
        l.isNil(e.publication.publicationNumber) || (t.publicationNumber = e.publication.publicationNumber),
        l.isNil(e.publication.publicationName) || (t.publicationName = e.publication.publicationName),
        l.isNil(e.publication.publicationTitle) || (t.publicationTitle = e.publication.publicationTitle),
        l.isNil(e.publication.publicationDateStart) || (t.publicationDateFrom = s(n.parseDate(e.publication.publicationDateStart)).toISO()),
        l.isNil(e.publication.publicationDateEnd) || (t.publicationDateTo = d(n.parseDate(e.publication.publicationDateEnd)).toISO())),
        t
    }
    generateNestedCaseHeaderQueryCriteria(a, e) {
        l.isNil(a.case.locationID) || (e["caseHeader.locationID"] = a.case.locationID),
        l.isNil(a.case.caseCategoryID) || (e["caseHeader.caseCategoryID"] = a.case.caseCategoryID),
        l.isNil(a.case.filedDateStart) || (e["caseHeader.filedDateFrom"] = s(n.parseDate(a.case.filedDateStart)).toISO()),
        l.isNil(a.case.filedDateEnd) || (e["caseHeader.filedDateTo"] = d(n.parseDate(a.case.filedDateEnd)).toISO()),
        a.case.excludeClosed && (e["caseHeader.closedFlag"] = !1),
        l.isNil(a.courtID) || (e["caseHeader.courtID"] = a.courtID)
    }
    generateQueryObject(a, e) {
        let t = l.cloneDeep(e);
        return t[a] = l.omitBy(t[a], l.isNil),
        t.case !== void 0 && (t.case = l.omitBy(t.case, l.isNil)),
        E.stringify(t)
    }
    parseURLParams(a, e) {
        let t = this.generateSearchDTO(a);
        return l.merge(t, E.parse(e.criteria)),
        t
    }
    populateDocketEntrySubTypes(a) {
        let e = []
          , t = l.sortBy(a, ["docketEntryType.docketEntryTypeName", "docketEntrySubTypeName"])
          , o = null;
        return t.forEach(u => {
            let c = u.docketEntryType
              , p = c.docketEntryTypeID;
            o !== p && (o = p,
            e.push({
                text: c.docketEntryTypeName + " - " + r.global.t("global.all"),
                value: "typeID:" + c.docketEntryTypeID
            })),
            e.push({
                text: `${u.docketEntryType.docketEntryTypeName} - ${u.docketEntrySubTypeName}`,
                value: "subtypeID:" + u.docketEntrySubTypeID
            })
        }
        ),
        e
    }
    parseDocketEntrySubTypeID(a) {
        let e = {
            docketEntryTypeID: null,
            docketEntrySubTypeID: null
        };
        return a.startsWith("typeID:") ? e.docketEntryTypeID = a.substring(7) : a.startsWith("subtypeID:") && (e.docketEntrySubTypeID = a.substring(10)),
        e
    }
}
class b extends C {
    getValidSearchTypes() {
        let a = super.getValidSearchTypes();
        return l.remove(a, e => e === i.SEARCH_TYPE_CITATION || e === i.SEARCH_TYPE_JUDGMENT),
        a
    }
    getSearchResultHeaders(a) {
        let e = super.getSearchResultHeaders(a);
        return a === i.SEARCH_TYPE_CALENDAR && (l.remove(e, ["value", "departmentActorInstance.displayName"]),
        l.remove(e, ["value", "judgeActorInstances"])),
        e
    }
    setSearchDefaults(a, e) {
        super.setSearchDefaults(a, e),
        e.case.excludeClosed = !1
    }
}
const D = new b;
export {D as S};
