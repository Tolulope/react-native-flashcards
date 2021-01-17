import React from 'react'
import { View, Platform } from 'react-native'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckMain from './components/DeckMain'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { purple, white } from './utils/colors'
import { setLocalNotification } from './utils/api'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import reducer from './reducers'

const store = createStore(reducer, middleware)

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={20} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={20} color={tintColor} />
    }
  }
}, {
  initialRouteName: 'Decks',
  backBehavior: 'Decks',
},{
  tabBarOptions: {
    activeTintColor: purple,
    style: {
      height: 56,
      backgroundColor: white,
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'Home',
      headerTintColor: 'white'
    }
  },
  DeckMain: {
    screen: DeckMain,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },
    }
  },
})

const AppContainer = createAppContainer(MainNavigator);


export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppContainer />
        </View>
      </Provider>
    )
  }
}
