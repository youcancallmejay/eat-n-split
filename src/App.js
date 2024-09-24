import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){


const [showAddFriend, setShowAddFriend] = useState(false);
const [friends, setFriends] = useState(initialFriends)

function handleAddFriend(newFriend){
  setFriends((friends) => [...friends, newFriend])
  setShowAddFriend(false)
}


function handleShowAddFriend(){
  setShowAddFriend((currentState) => !currentState)
}

  return (
  <div className="app">
    <div className="sidebar">
      <FriendsList friends={friends}/>
      {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
      <Button  onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
    </div>
    <FormSplitBill />
  </div>
  )
}


function FriendsList({friends}){
  return(
    <ul>
      {friends.map((friend)=> <Friend friend={friend} key={friend.id}/>)}
    </ul>
  )
}

function Friend({friend}){
  return(
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>) }

      {friend.balance > 0 && (
      <p className="green">
        {friend.name} owes you ${Math.abs(friend.balance)}
      </p>) }

      {friend.balance === 0 && (
      <p>
        You and {friend.name} are even
      </p>) }
        <Button>Select</Button>
    </li>
  )
}

function Button({children, onClick}){
  return(
    <button className="button" onClick={onClick}>{children}</button>
  )
}

function FormAddFriend({onAddFriend}){
  const id = crypto.randomUUID();

  const [name, setName] = useState();
  const [image, setImage] =useState("https://i.pravatar.cc/48"); 

  function handleOnSubmit(e){
    if(!name || !image) return;

    e.preventDefault(); 

    const newFriend = {
     name,
     image: `${image}?=${id}`,
     balance: 0,
    }

    onAddFriend(newFriend);
    setName("")
    setImage("https://i.pravatar.cc/48")
  }

  return(
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <label>👯 Friend name</label>
      <input value={name} type="text" onChange={(e) => setName(e.target.value)}></input>

      <label>🌇 Image URL</label>
      <input value={image}type="text" onChange={(e) => setImage(e.target.value)}></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill(){
  return(
    <form className="form-split-bill">
      <h2>split the bill with x</h2>
      <label> Bill value</label>
      <input type="text"></input>

      <label>Your expense</label>
      <input type="text"></input>

      <label>X's expense</label>
      <input type="text" disabled></input>

      <label>Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend"> X</option>
      </select>
      <Button>Split bill</Button>

    </form>
  );
}
