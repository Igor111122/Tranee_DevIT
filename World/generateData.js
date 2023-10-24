function generateName(){
    const name = [
        "Alice", "Bob", "Charlie", "David", "Ella", "Frank", "Grace", "Henry", "Isabella", "Jack","Katherine", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Rachel", "Samuel", "Taylor","Ursula", "Victor", "Wendy", "Xander", "Yasmine", "Zachary", "Abigail", "Benjamin", "Chloe", "Daniel", "Emily", "Finn", "Gabriella", "Hannah", "Isaac", "Jessica", "Kylie", "Lucas", "Mackenzie", "Natalie", "Oliver", "Penelope", "Quentin", "Rebecca", "Sophia", "Thomas",
        "Ulysses", "Violet", "William", "Xavier", "Yvonne", "Zoe","Aiden", "Bella", "Caleb", "Dylan", "Evelyn", "Fiona", "George", "Hazel", "Ivy", "James",
        "Katelyn", "Landon", "Maddison", "Nathan", "Oliver", "Peyton", "Quinn", "Riley", "Sophia", "Toby","Uma", "Vincent", "Willa", "Xander", "Yara", "Zane",
        "Addison", "Brayden", "Cameron", "Delilah", "Eli", "Felicity", "Gavin", "Harper", "Isaiah", "Jasmine","Kylie", "Liam", "Madison", "Nolan", "Olivia", "Piper", "Quinn", "Reagan", "Sophia", "Tristan","Ulysses", "Vivian", "William", "Xavier", "Yasmine", "Zachary",
        "Alexander", "Brianna", "Caleb", "Danielle", "Ella", "Finn", "Grace", "Henry", "Isabella", "Jacob","Katherine", "Landon", "Mia", "Nathan", "Olivia", "Peyton", "Quinn", "Rachel", "Samuel", "Taylor","Ursula", "Victor", "Wendy", "Xander", "Yasmine", "Zachary",
        "Aria", "Benjamin", "Charlotte", "David", "Ella", "Finn", "Grace", "Henry", "Isabella", "James","Katherine", "Liam", "Mia", "Nolan", "Olivia", "Penelope", "Quinn", "Rebecca", "Sophia", "Thomas","Ulysses", "Violet", "William", "Xavier", "Yvonne", "Zoe",
        "Abigail", "Benjamin", "Chloe", "Daniel", "Emily", "Finn", "Gabriella", "Hannah", "Isaac", "Jessica","Kylie", "Lucas", "Mackenzie", "Natalie", "Oliver", "Penelope", "Quentin", "Rebecca", "Sophia", "Thomas","Ulysses", "Violet", "William", "Xavier", "Yvonne", "Zoe","Aiden", "Bella", "Caleb", "Dylan", "Evelyn", "Fiona", "George", "Hazel", "Ivy", "James",
        "Katelyn", "Landon", "Maddison", "Nathan", "Oliver", "Peyton", "Quinn", "Riley", "Sophia", "Toby","Uma", "Vincent", "Willa", "Xander", "Yara", "Zane",
        "Addison", "Brayden", "Cameron", "Delilah", "Eli", "Felicity", "Gavin", "Harper", "Isaiah", "Jasmine","Kylie", "Liam", "Madison", "Nolan", "Olivia", "Piper", "Quinn", "Reagan", "Sophia", "Tristan","Ulysses", "Vivian", "William", "Xavier", "Yasmine", "Zachary","Alexander", "Brianna", "Caleb", "Danielle", "Ella", "Finn", "Grace", "Henry", "Isabella", "Jacob","Katherine", "Landon", "Mia", "Nathan", "Olivia", "Peyton", "Quinn", "Rachel", "Samuel", "Taylor",
        "Ursula", "Victor", "Wendy", "Xander", "Yasmine", "Zachary","Aria", "Benjamin", "Charlotte", "David", "Ella", "Finn", "Grace", "Henry", "Isabella", "James",
        "Katherine", "Liam", "Mia", "Nolan", "Olivia", "Penelope", "Quinn", "Rebecca", "Sophia", "Thomas","Ulysses", "Violet", "William", "Xavier", "Yvonne", "Zoe"
      ];
      
    const randomIndex = Math.floor(Math.random() * name.length);
    return name[randomIndex];
}

function generateSurname(){
    const Surname = [
        "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor","Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson","Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
        "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter","Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins","Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
        "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez","James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross","Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington",
        "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes","Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan","Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "McDonald", "Cruz", "Marshall", "Ortiz",
        "Gomez", "Murray", "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter","Hicks", "Crawford", "Henry", "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos","Reyes", "Burns", "Gordon", "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels",
        "Palmer", "Mills", "Nichols", "Grant", "Knight", "Ferguson", "Rose", "Stone", "Hawkins", "Dunn","Perkins", "Hudson", "Spencer", "Gardner", "Stephens", "Payne", "Pierce", "Berry", "Matthews", "Arnold","Wagner", "Willis", "Ray", "Watkins", "Olson", "Carroll", "Duncan", "Snyder", "Hart", "Cunningham","Bradley", "Lane", "Andrews", "Ruiz", "Harper", "Fox", "Riley", "Armstrong", "Carpenter", "Weaver","Greene", "Lawrence", "Elliott", "Chavez", "Sims", "Austin", "Peters", "Kelley", "Franklin", "Lawson","Fields", "Gutierrez", "Ryan", "Schmidt", "Carr", "Vasquez", "Castillo", "Wheeler", "Chapman", "Oliver","Montgomery", "Richards", "Williamson", "Johnston", "Banks", "Meyer", "Bishop", "McCoy", "Howell", "Alvarez","Morrison", "Hansen", "Fernandez", "Garza", "Harvey", "Little", "Burton", "Stanley", "Nguyen", "George",
      ];
    const randomIndex = Math.floor(Math.random() * Surname.length);
    return Surname[randomIndex];
}

module.exports = {
    generateSurname,
    generateName
  };