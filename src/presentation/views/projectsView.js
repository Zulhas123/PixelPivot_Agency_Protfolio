import { clear, el } from "../components/dom.js";

const PROJECTS = [
  { title: "ERP", text: "A robust enterprise resource planning system to streamline core operations." },
  { title: "HR Management", text: "Centralize employee records, attendance, leave, and role-based workflows." },
  { title: "Payroll Management", text: "Automate salary calculations, payslips, deductions, and monthly payroll processing." },
  { title: "VAT Management", text: "Track VAT rates, invoices, returns, and reports for compliance and audits." },
  { title: "Landing Page", text: "High-converting, mobile-first landing pages optimized for speed and SEO." },
  { title: "Portfolio Website", text: "Modern portfolio sites to showcase work, skills, and case studies." },
  { title: "Hospital Management", text: "Manage patients, billing, wards, labs, and staff operations in one system." },
  { title: "School Management", text: "Handle students, classes, attendance, fees, results, and communications." },
  { title: "Doctor Appointment", text: "Online booking with schedules, confirmations, and patient appointment history." },
  { title: "Super Shop Management", text: "Inventory, purchase, sales, and POS-ready workflows for retail stores." },
  { title: "Courier Management", text: "Order tracking, delivery assignments, status updates, and reporting dashboards." },
  { title: "Agro Firm Management", text: "Manage farming operations, inventory, suppliers, sales, and financial tracking." },
  { title: "Online Ticket Booking", text: "Seat selection, booking, payment integration, and e-ticket generation." },
  { title: "Coaching Management", text: "Student enrollment, batches, fees, attendance, and performance tracking." },
  { title: "Online Exam System", text: "Create exams, run timed tests, and generate results with analytics." },
  { title: "Pharmacy Management", text: "Manage medicine inventory, purchases, sales, expiry alerts, and billing." },
  { title: "Agency Portfolio", text: "Agency-style portfolio with services, projects, testimonials, and contact funnel." },
];

export function renderProjects({ root }) {
  clear(root);
  for (const project of PROJECTS) {
    root.append(
      el("div", { class: "card" }, [
        el("div", { class: "content" }, [
          el("h3", {}, project.title),
          el("p", {}, project.text),
        ]),
      ]),
    );
  }
}
