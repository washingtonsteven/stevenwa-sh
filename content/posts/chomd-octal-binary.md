---
date: 2019-06-03T10:39:38.631Z
title: chomd + octal + binary
featured_image: /assets/alex-martinez-62348-unsplash.jpg
featured: false
---
Every so often I'll be setting up a project and run into file permission issues. Most times, I'll Google the error and come across a forum post that's something like

> Just type `chmod 755 ./file.txt` in Terminal and you'll be fine.

So while this works, it would be much better if I actually knew that this line was doing. 

The first part is easy: `chmod` is the name of the process that actually changes the permissions on the file I want.

The last part is even easier: It's just the path to the file I want to change the permissions on.

But that's that `755` about? How does that relate to file permissions?

## Unix permissions basics

_Very_ basically, file permission roles are broken up into 3 types of people: User, Group and World.

**User** is the owner of the file.\
**Group** is a special set of users can have special privileges on the file.\
**Others** is everyone else.

In addition, there are four types of permissions: Read, Write, Execute, and None. Read, Write and None are self explanatory. Having the "execute" permission means that you can run the file, as opposed to simply opening it or editing it. This is usually for files that are executable by the system like shell scripts or similar.

For example: If you have Read and Write permissions for `./file.sh`, you can open it, and you can edit it. But without the "Execute" permission, you can't run the script.

## Viewing Permissions

Try something out for me: Open up a terminal, go to a directory with a bunch of files, and type `ls -l`. This will list all the files in the directory (`ls`) in a long format (`-l`). You'll get something like this:

![](/assets/screen-shot-2019-07-18-at-1.50.05-pm.png)

Look on the very left column, and you'll see a combination of 10 `r`'s, `w`'s, `x`'s, and `-`'s. This is not a random jumble of letters, but actually a lineup of permissions:

* The first digit is the directory flag. If the row describes a directory, it'll be `d`, otherwise it will be `-`
* The next three digits are the User permissions. This is set up in order `rwx` or "Read, Write, E**x**ecute.
* The next three are the Group permissions, set up the same as the User
* The next three are Other permissions

Let's take this line for example

```bash
-rw-r--r--     1 stevewashington  staff     805 Jul 17 19:11 package.json
```

We can take that first column, and break it up into 4 sections:

`-` >> This is the directory flag. package.json is not a directory, so this is '-'\
`rw-` >> these next three digits are the "User" section. So the Owner ("stevewashington") can Read the file, Write to the file, but not Execute it.\
`r--` >> These are the "Group" permissions. Anyone in the defined Group ("staff") can read the file, but not write to it or execute it.\
`r--` >> These are "Other" permissions, which are the same as "Group," can read, but not write or execute.

## Okay but what about the numbers?

The number in the `chmod` command (`755` in the example above) are in "octal", or base-8. Each digit can hold a number from 0-7, and the number 8 is "10" in octal.

You may notice that the number has 3 digits, and these digits correspond perfectly to the User, Group, Other permissions. User is 7, Group is 5, and Other is also 5.

So now we just need to convert each digit from octal to a set of 3 letters: `rwx`. And we will be using binary as an intermediary:

|       | Octal/Decimal | Binary |
| ----- | ------------- | ------ |
| User  | 7             | 111    |
| Group | 5             | 110    |
| Other | 5             | 110    |

Here we have the conversions for each digit in `755` to binary (as in "seven, five, five", not "seven hundred fifty five")

Here's another "coincidence", the binary numbers also have 3 digits! So we can turn on or off "rwx" flags based on whether the binary number is 1 or 0:

|       | Octal/Decimal | Binary | Permissions |
| ----- | ------------- | ------ | ----------- |
| User  | 7             | 111    | rwx         |
| Group | 5             | 101    | r-x         |
| Other | 5             | 101    | r-x         |

If we mash them together, we see that `chmod 755 ./file.txt` means:

> Change `./file.txt` so that: 
>
> * the owner can read, write, and execute it
> * the defined group can read it and execute it
> * everyone else can also read and execute it

Knowing this, this is actually fairly open permissions for a file. Are you use you want absolutely everyone to be able to execute a program on your server? 🤔

Using the `package.json` example from above, we can work it out backwards:

|       | Permissions | Binary | Octal/Decimal |
| ----- | ----------- | ------ | ------------- |
| User  | rw-         | 110    | 6             |
| Group | r--         | 100    | 4             |
| Other | r--         | 100    | 4             |

So copying the permissions of `package.json` we'd use something like `chmod 644 ./file.txt`. This means for package.json:

> * the owner can read, write, but not execute it
> * the defined group can only read it
> * everyone else can only read it as well

Which makes sense! You can't really "execute" .json files, so there's no reason to give that permission to anyone.

Like how octal rwx is like bindary

rwx r-x r-x

111 101 101

7 5 5

etc.

Photo by Alex Martinez on Unsplash
