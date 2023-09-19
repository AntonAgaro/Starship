import React from 'react'
import styles from './MainPage.module.less'
import Logo from './Assets/Images/Logo.png'
import Ship from './Assets/Images/Ship.png'
import ShipTwo from './Assets/Images/ShipTwo.png'
import ShipThree from './Assets/Images/ShipThree.png'
import { Button, Image } from 'antd'
import Title from 'antd/es/typography/Title'

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Image src={Logo} preview={false} className={styles.logo} />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Игра</Button>
        <Button type="primary">Профиль</Button>
        <Button type="primary">Форум</Button>
        <Button type="primary">Лидерборд</Button>
      </div>
      <Title className={styles.title}>Starship</Title>
      <div className={styles.intro}>
        <Image className={styles.image} src={Ship} preview={false} />
        <div className={styles.textBlock}>
          <Title level={3} className={styles.title}>
            Введение в игру Starship
          </Title>
          <span className={styles.text}>
            Starship&nbsp;&mdash; это захватывающая браузерная игра, которая
            позволит вам стать капитаном собственного космического корабля
            и&nbsp;отправиться в&nbsp; незабываемое путешествие
            по&nbsp;вселенной. Благодаря интуитивно понятному управлению
            с&nbsp;использованием клавиатурных стрелочек, вы&nbsp;сможете легко
            маневрировать своим кораблем и&nbsp;преодолевать различные
            препятствия на&nbsp;своем пути.
          </span>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.textBlock}>
          <Title level={3} className={styles.title}>
            Особенности игры
          </Title>
          <ul className={styles.text}>
            <li>
              Интуитивно понятное управление с использованием клавиатурных
              стрелочек для перемещения корабля.
            </li>
            <li>
              Реалистичная графика с использованием Canvas API для создания
              потрясающих космических пейзажей.
            </li>
            <li>
              Возможность прокачки и улучшения корабля с помощью различных
              модулей и улучшений.
            </li>
            <li>
              Участие в захватывающих сражениях с другими игроками или
              космическими монстрами.
            </li>
            <li>
              Наличие лидерборда, где игроки могут соревноваться за первые места
              и получать уникальные награды.
            </li>
          </ul>
        </div>
        <Image className={styles.image} src={ShipTwo} preview={false} />
      </div>
      <div className={styles.forum}>
        <Image className={styles.image} src={ShipThree} preview={false} />
        <div className={styles.textBlock}>
          <Title level={3} className={styles.title}>
            Форум и сообщество
          </Title>
          <span className={styles.text}>
            В&nbsp;игре Starship будет активный форум, где игроки смогут
            общаться друг с&nbsp;другом, обсуждать свои успехи и&nbsp;делиться
            советами по&nbsp;прохождению игры. Это позволит создать
            дружественное сообщество, которое будет поддерживать и&nbsp;помогать
            друг другу в&nbsp;прохождении сложных уровней.
          </span>
        </div>
      </div>
      <div className={styles.development}>
        <Title level={3} className={styles.title}>
          Разработка игры
        </Title>
        <span className={styles.text}>
          Игра Starship разрабатывается с&nbsp;использованием современных
          технологий, таких как React, Redux toolkit и&nbsp;Less. Такой подход
          позволяет создавать быстрые, эффективные и&nbsp;адаптивные интерфейсы,
          что делает игру еще более увлекательной и&nbsp;приятной для игроков.
        </span>
      </div>
      <div className={styles.join}>
        <Title level={3} className={styles.title}>
          Присоединяйся
        </Title>
        <span className={styles.text}>
          Примите вызов и&nbsp;станьте капитаном своего космического корабля
          в&nbsp;игре Starship! Исследуйте вселенную, сражайтесь с&nbsp;врагами
          и&nbsp;соревнуйтесь с&nbsp;другими игроками за&nbsp;первые места
          в&nbsp;лидерборде. Присоединяйтесь к&nbsp;нашему сообществу
          и&nbsp;делитесь своими впечатлениями на&nbsp;форуме!
        </span>
      </div>
    </div>
  )
}

export default MainPage
