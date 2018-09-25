import callHistory from './callHistory.json';
import styles from './scss/main.scss';
import * as moment from 'moment';

// document.getElementById('content').innerText = JSON.stringify(callHistory);

class ContactsWidget {
    constructor(contacts) {
        this.root = document.querySelector('section');
        this.render(this.sortContacts(this.extractContactsFromHistory(contacts)));
    }

    render(contacts) {
        this.root.innerHTML = '';
        contacts.forEach(contact => {
            const dateObj = this.formatTimestamp(contact.lastCalled);
            this.root.innerHTML += this.getRowHTML(contact, dateObj);
        });
        this.addRowEvents();
    }

    extractContactsFromHistory(callHistory) {
        const contacts = new Map();

        callHistory.forEach(call => {
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

    addRowEvents() {
        const contacts = this.root.querySelectorAll('article');
        contacts.forEach(row => {
            row.addEventListener('click', function () {
                // I needed "this" to refer to the row element
                this.classList.toggle('open');
            });
        });
    }

    getRowHTML(contactData, dateObj) {
        const { firstName, lastName, phoneNumber } = contactData;
        return `<article>
            <div class="row"><p>${firstName}<strong>${lastName}</strong></p><time>${dateObj.timeago}</time></div>
            <div class="details"><p>Number: ${phoneNumber} <em>last call: ${dateObj.dateTime}</em></p></div>
        </article>`;
    }

    formatTimestamp(timestamp) {
        return {
            dateTime: moment.unix(timestamp).format("MMM Do, YYYY"), // 'Aug 8, 2018',
            timeago: moment.unix(timestamp).fromNow() //'2 day ago'
        }
    }
}

const app = new ContactsWidget(callHistory);
