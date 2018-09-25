import callHistory from './callHistory.json';
import styles from './scss/main.scss';
import formatTimestamp from './time';

/**
 * I made it a class because the task looked like a reusable contacts widget
 */
class ContactsWidget {
    constructor(callLogs) {
        this.root = document.querySelector('section');
        /**
         * Here I followed a simple functional approach, passing the data from one stage to another
         */
        this.render(this.sortContacts(this.extractContactsFromHistory(callLogs)));
    }

    /**
     * This method returns unique contacts {Map} from a call history
     *  - each contact entry contains the lates call timestamp as 'lastCalled'
     *  - each contact entry contains the number of calls as 'callCount'
     * @param {array} callLogs: list of call history items
     */
    extractContactsFromHistory(callLogs) {
        const contacts = new Map();

        callLogs.forEach(call => {
            if (!contacts.get(call.phoneNumber)) {
                const { firstName, lastName, phoneNumber } = call;
                const contactData = {
                    firstName,
                    lastName,
                    phoneNumber,
                    lastCalled: call.called,
                    callCount: 1,
                };
                contacts.set(call.phoneNumber, contactData);
            } else {
                const detail = contacts.get(call.phoneNumber);
                detail.callCount++;
                detail.called = (detail.called < call.called) ? call.called : detail.called;
                contacts.set(call.phoneNumber, detail);
            }
        });
        return contacts;
    }

    /**
     * This method sorts the contact list based on the callCount property in descending order
     *  - sorting also makes sure that on equal call counts, the latest contact is ranked higher
     * @param {map} contacts: a map of contacts
     */
    sortContacts(contacts) {
        const sortAlgo = (a, b) => {
            let res = 0;
            if (b[1].callCount !== a[1].callCount) {
                res = b[1].callCount - a[1].callCount;
            } else {
                res = b[1].lastCalled - a[1].lastCalled;
            }
            return res;
        }
        return new Map([...contacts.entries()].sort(sortAlgo));
    }

    /**
     * After the HTML list is populated, add click events to toggle the click class
     * all view switches are happening in CSS
     */
    addRowEvents() {
        const contacts = this.root.querySelectorAll('article');
        contacts.forEach(row => {
            row.addEventListener('click', function () {
                // I needed "this" to refer to the row element
                this.classList.toggle('open');
            });
        });
    }

    /**
     * Simple tempate render function that returns HTML string
     * @param {object} contactData: entry of a contact list
     * @param {object} dateObj: formatted timestamp object
     */
    getRowHTML(contactData, dateObj) {
        const { firstName, lastName, phoneNumber } = contactData;
        return `<article>
            <div class="row"><p>${firstName}<strong>${lastName}</strong></p><time>${dateObj.timeago}</time></div>
            <div class="details"><p>Number: ${phoneNumber} <em>last call: ${dateObj.dateTime}</em></p></div>
        </article>`;
    }

    /**
     * Renders the HTML and adds events to the list
     * @param {map} contacts: list of contacts
     */
    render(contacts) {
        this.root.innerHTML = '';
        contacts.forEach(contact => {
            const dateObj = formatTimestamp(contact.lastCalled);
            this.root.innerHTML += this.getRowHTML(contact, dateObj);
        });
        this.addRowEvents();
    }
}

const app = new ContactsWidget(callHistory);
