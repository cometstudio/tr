<i18n src="../i18n/messenger.json"></i18n>

<template>
    <div class="messenger">
        <div class="messenger__contacts">
            <div class="contacts__filter">
                <ui-textbox
                    floating-label
                    type="text"
                    v-model="contacts.filter.q"
                    :invalid="contacts.filter.q.length > 10"
                    :help="$t(contacts.validation.hints.q())"
                    icon-position="right">
                    <div slot="icon">
                        <font-awesome-icon icon="times" v-if="contacts.filter.q.length" @click="resetContactsFilter"></font-awesome-icon>
                    </div>
                    {{ $t('contacts.filter.placeholder') }}
                </ui-textbox>
            </div>
        </div>
        <div class="messenger__messages">
            messenger__messages
        </div>
    </div>
</template>

<script>
  import PropertyFilter from '../components/property/Filter'

  const errors = ()=>{
      return {
          q: [],
      }
  }

export default {
    name: 'Messages',
    data(){
        return {
            contacts: {
                filter: {
                    q: ''
                },
                validation: {
                    errors: errors(),
                    hints: {
                        q: ()=>{
                            return this._.first(this.contacts.validation.errors.q)
                        },
                    },
                },
            },
        }
    },
    components: {
        PropertyFilter
    },
    methods: {
        resetContactsFilter(){
            this.contacts.filter.q = '';
        },
        filterContacts(){
            console.log('filter contacts');
        },
    }
}
</script>

<style lang="scss" scoped>
    .messenger{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: baseline;
        align-content: flex-start;
        > div{
            padding: $globalPadding;
        }
        &__contacts{
            flex-basis: 25%;
            svg{
                cursor: pointer;
            }
        }
        &__messages{
            flex-grow: 1;
        }
    }

    @media (max-width: $mobileMaxWidth) {
        .messenger{
            display: block;
        }
    }
</style>