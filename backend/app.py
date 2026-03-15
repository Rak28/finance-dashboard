from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, date
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///finance.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

CATEGORIES = ["Food & Dining","Transportation","Shopping","Entertainment","Housing","Healthcare","Education","Travel","Income","Other"]

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(10), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today)
    note = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'amount': self.amount, 'category': self.category, 'type': self.type, 'date': self.date.isoformat(), 'note': self.note, 'created_at': self.created_at.isoformat()}

@app.route('/api/health')
def health(): return jsonify({'status': 'ok'})

@app.route('/api/categories')
def get_categories(): return jsonify(CATEGORIES)

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    q = Transaction.query
    if c := request.args.get('category'): q = q.filter_by(category=c)
    if t := request.args.get('type'): q = q.filter_by(type=t)
    if s := request.args.get('start_date'): q = q.filter(Transaction.date >= datetime.strptime(s, '%Y-%m-%d').date())
    if e := request.args.get('end_date'): q = q.filter(Transaction.date <= datetime.strptime(e, '%Y-%m-%d').date())
    return jsonify([t.to_dict() for t in q.order_by(Transaction.date.desc()).limit(int(request.args.get('limit', 1000))).all()])

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.get_json()
    t = Transaction(title=data['title'], amount=float(data['amount']), category=data['category'], type=data['type'], date=datetime.strptime(data['date'], '%Y-%m-%d').date(), note=data.get('note', ''))
    db.session.add(t); db.session.commit()
    return jsonify(t.to_dict()), 201

@app.route('/api/transactions/<int:id>', methods=['DELETE'])
def delete_transaction(id):
    t = Transaction.query.get_or_404(id); db.session.delete(t); db.session.commit()
    return jsonify({'message': 'Deleted'})

@app.route('/api/summary')
def get_summary():
    txns = Transaction.query.all()
    income = sum(t.amount for t in txns if t.type == 'income')
    expenses = sum(t.amount for t in txns if t.type == 'expense')
    by_cat = {}
    for t in txns:
        if t.type == 'expense': by_cat[t.category] = by_cat.get(t.category, 0) + t.amount
    return jsonify({'total_income': round(income, 2), 'total_expenses': round(expenses, 2), 'balance': round(income - expenses, 2), 'by_category': by_cat, 'transaction_count': len(txns)})

@app.route('/api/seed', methods=['POST'])
def seed():
    db.session.query(Transaction).delete()
    sample = [('Salary',5000,'Income','income','2026-03-01'),('Rent',1200,'Housing','expense','2026-03-02'),('Groceries',150,'Food & Dining','expense','2026-03-03'),('Netflix',15,'Entertainment','expense','2026-03-04'),('Gas',60,'Transportation','expense','2026-03-05'),('Freelance',800,'Income','income','2026-03-06'),('Restaurant',45,'Food & Dining','expense','2026-03-07'),('Gym',50,'Healthcare','expense','2026-03-08'),('Amazon',120,'Shopping','expense','2026-03-09'),('Uber',25,'Transportation','expense','2026-03-10')]
    for title,amount,category,type_,date_str in sample:
        db.session.add(Transaction(title=title,amount=amount,category=category,type=type_,date=datetime.strptime(date_str,'%Y-%m-%d').date()))
    db.session.commit()
    return jsonify({'message': 'Seeded'})

if __name__ == '__main__':
    with app.app_context(): db.create_all()
    app.run(debug=True, port=5000)