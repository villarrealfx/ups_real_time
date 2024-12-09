from django.shortcuts import render


def index(request):
    return render(request, 'graph/graph.html', context={'text': 'Esto viene de la Vista de GRAPH'})