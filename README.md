<div align="center">
  <h1>Kurva Bézier dengan Algoritma Titik Tengah berbasis Divide and Conquer</h1>
  <h3>Tugas Kecil 2 IF2211 Strategi Algoritma</h3>
  <p>Oleh kelompok 2</p>
  <a><img src=https://simonhalliday.files.wordpress.com/2021/03/bezier_2_big.svg_.png alt="kurva" border="0" width = "500"></a>
  <br/>
  <br/>
</div>

>🎓 Project Background: We created the greedy algorithms in "DIAMONDS" game bot as part of my Algorithm Strategies assignment during my fourth semester in the Computer Science program at ITB.
## 📝 Description
Diamonds is a programming challenge that pits the bot you create against bots from other players. Each player will have a bot where the goal of this bot is to collect as many diamonds as possible by using greedy algorithms. There are several main components of the greedy algorithm in this program, namely greedy by diamonds, teleporters, diamond game button, base, and milliseconds left.
## 📁 Project Structure
```bash
susugratis
├── doc
│   └── susugratis.pdf
├── src (front-end)
│   ├── __pycache__ (decode.cpython-311.pyc)
│   ├── game
│   │   ├── __pycache__
│   │   ├── logic
│   │   │   ├── __pycache__ (__init__.cpython-311.pyc, base.cpython-311.pyc, mainLogic.cpython-311.pyc, random.cpython-311.pyc)
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   └── mainLogic.py
│   │   ├── __init__.py
│   │   ├── api.py
│   │   ├── board_handler.py
│   │   ├── bot_handler.py
│   │   ├── models.py
│   │   └── util.py
│   ├── .gitignore
│   ├── decode.py
│   ├── main.py
│   ├── run-bots.bat
│   ├── run-bots.sh
│   └── README.md  
├── img (GameEngineWithBots.png)
└── README.md
```

## 🪛Dependencies
1. Game Engine

    •   Node.js (https://nodejs.org/en )

    •   Docker desktop (https://www.docker.com/products/docker-desktop/ )

    •   Yarn
2. Bot Engine

    • Python

## 🔩 Configuration Guide
### 💎 Game Engine Setup:
1. Clone the repository to your local files and make sure you have installed the dependencies to your device. Access the repository [here](https://github.com/haziqam/tubes1-IF2211-game-engine/releases/tag/v1.1.0).
2. Extract the zip, then go to the extracted folder and open the terminal.
3. Go to the root directory of the project and run `cd tubes1-IF2110-game-engine-1.1.0` in terminal.
4. Installing dependencies by execute `yarn` in terminal.
5. Configure environment variables by running the following script `./scripts/copy-env.bat`.
6. Setup local database (open the Docker desktop application first, then run the following command in the terminal) `compose up -d database`.
7. Run the following script for Windows `./scripts/setup-db-prisma.bat`.
8. Perform the build command `npm run build`.

### 🤖 Bot Engine Setup:
1. Clone this repository to your local files and make sure you have installed the dependencies to your device. Access the repository [here](repository-link).

## 🏃‍♂️ How to Run
1. change the terminal directory to the root directory of game engine file by execute `cd tubes1-IF2110-game-engine-1.1.0` in terminal.
2. run the game engine by executing `npm run start` and make sure the game engine is running on (http://localhost:8082/).
3. change the terminal directory to the bot engine file by execute `cd susugratis\src`.
4. to run the bot you can execute the logic by using `python main.py --logic logic --email=komeng@email.com --name=komeng --password=123456 --team etimo`.
5. For windows you can also run the bot by executing `./run-bots.bat` and also for linux you can run the bot by executing `./run-bots.sh`.

## 🪪 Contributors
| NIM | Name | Linkedin |
| :---: | :---: | :---: |
| 13522124 | Aland Mulia Pratama | [LinkedIn](https://www.linkedin.com/in/aland-m/) |
| 13522161 | Mohamad Akmal Ramadan | [LinkedIn](https://www.linkedin.com/in/akmalrmn/) |
| 13522163 | Atqiya Haydar Luqman | [LinkedIn](https://www.linkedin.com/in/atqiyahaydar/) |

## 📸 Screenshots
<div align="center" >
  <img src="img/GameEngineWithBots.png" alt="Game Engine" width="750"/>
  <p><b>Game Engine with Bots</b></p>
</div>