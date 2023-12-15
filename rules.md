# Reglas utilizadas para el jugador automático de Tic tac toe
- Si el jugador puede ganar en el siguiente movimiento, hazlo.
- Si el oponente puede ganar en su siguiente movimiento, bloquéalo.
- Si el jugador puede crear una bifurcación (dos caminos ganadores), hazlo para ganar.
- Si el oponente puede crear una bifurcación, bloquéala.
- Coloca el marcador en el centro.
- Si el oponente ha colocado su marcador en una esquina, coloca el tuyo en el lado opuesto.
- Coloca el marcador en una esquina.
- Coloca el marcador en cualquier lado.

---
- Si puedes ganar en el siguiente movimiento, hazlo
- Impedir que forme 3 en raya

- Camino 1:
  - Si comienza por las esquinas, vas al centro
  - Si su segundo movimiento es una esquina diametralmente opuesta, vas a cualquier arista

- Camino 2:
  - Si comienza por el centro, vas a una esquina
  - Si su segundo movimiento es una esquina, vas a la esquina opuesta