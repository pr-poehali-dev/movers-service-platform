import json
import os
import urllib.request

def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    service = body.get('service', '').strip()
    comment = body.get('comment', '').strip()

    if not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Телефон обязателен'})
        }

    lines = ['📦 <b>Новая заявка с сайта</b>']
    if name:
        lines.append(f'👤 Имя: {name}')
    lines.append(f'📞 Телефон: {phone}')
    if service:
        lines.append(f'🔧 Услуга: {service}')
    if comment:
        lines.append(f'💬 Комментарий: {comment}')

    text = '\n'.join(lines)

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode()

    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
