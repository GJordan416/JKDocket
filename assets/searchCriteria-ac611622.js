import {b as r, d as t} from "./index-c903cc1f.js";
import {S as i} from "./search-50600abe.js";
const e = r()
  , o = {
    props: {
        searchType: {
            type: String
        },
        searchDTO: {
            type: Object
        }
    },
    computed: {
        queryTypes() {
            return t.orderBy([{
                title: this.$t("global.queryType.contains"),
                value: this.CONST.QUERY_TYPE_CONTAINS
            }, {
                title: this.$t("global.queryType.exact"),
                value: this.CONST.QUERY_TYPE_EXACT
            }, {
                title: this.$t("global.queryType.match"),
                value: this.CONST.QUERY_TYPE_MATCH
            }, {
                title: this.$t("global.queryType.startsWith"),
                value: this.CONST.QUERY_TYPE_STARTS_WITH
            }, {
                title: this.$t("global.queryType.phonetic"),
                value: this.CONST.QUERY_TYPE_PHONETIC_MATCH
            }], "title")
        },
        courts() {
            return e.courts
        },
        isSingleCourtMode() {
            return e.isSingleCourtMode
        },
        actorCategories() {
            return t.orderBy([{
                title: this.$t("global.actorType.person"),
                actorCategoryID: this.CONST.ACTOR_CATEGORY_PERSON
            }, {
                title: this.$t("global.actorType.organization"),
                actorCategoryID: this.CONST.ACTOR_CATEGORY_ORGANIZATION
            }], "title")
        },
        representationActorTypes() {
            return t.orderBy([{
                title: this.$t("page.searchCriteria.party.field.attorney"),
                value: this.CONST.ACTOR_TYPE_ATTORNEY
            }, {
                title: this.$t("page.searchCriteria.party.field.legalOrg"),
                value: this.CONST.ACTOR_TYPE_LEGAL_ORGANIZATION
            }], "title")
        }
    },
    methods: {
        getDefaultQueryType: i.getDefaultQueryType
    }
};
export {o as S};
