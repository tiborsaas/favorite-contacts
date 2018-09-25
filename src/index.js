import callHistory from './callHistory.json';
import styles from './scss/main.scss';
import formatTimestamp from './time';

class ContactsWidget {
    constructor(callLogs) {
        this.root = document.querySelector('section');
        this.render(this.sortContacts(this.extractContactsFromHistory(callLogs)));
    }

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
