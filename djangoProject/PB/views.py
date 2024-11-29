import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.http import StreamingHttpResponse
from django.shortcuts import render
import asyncio
import json


# Create your views here.
def PB1(request):
    return render(request, 'PB1.html')


async def sourcesB(request):
    async def event_streamB():
        while True:
            data = json.dumps({'foo': 'bar'})
            yield f'data:{data}'
            await asyncio.sleep(1)

    response = StreamingHttpResponse(event_streamB())
    response['Cache-Control'] = 'no-cache'
    response['Content-Type'] = 'text/event-stream'
    response['Connection'] = 'keep-alive'
    response.flush()
    return response


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))
