from django.db import models

# Create your models here.

#user model: allows a user to make an account with a username, password, and email, with a lastfm username stored to their profile
class User(models.Model):
    username = models.CharField(max_length=25, primary_key=True, unique=True)
    password = models.CharField(max_length= 255)
    lastfm_user = models.CharField(max_length= 25)
    email = models.EmailField()

#weekly report: takes a weekly report from the frontend with the lastfm username of the submitting user, the date that starts the range of the request, and the contents of the api request, as a json
class Weekly_Report(models.Model):
    date_range = models.DateField()
    lastfm_user = models.ForeignKey(User, on_delete=models.CASCADE)
    report_contents = models.JSONField
    report_ID = models.BigAutoField(primary_key=True)


#report tracks: from the json pulled from the last.fm api, a table of each unique album listed in the week
class Report_Tracks(models.Model):
    class Meta:
        unique_together = (('rank', 'report_ID'),)

    rank = models.IntegerField()
    playcount = models.IntegerField()
    report_ID = models.ForeignKey(Weekly_Report, on_delete=models.CASCADE)
    mb_ID = models.CharField(max_length=36)

class Album(models.Model):
    album_ID = models.BigAutoField(primary_key=True)
    mb_ID = models.ForeignKey(Report_Tracks, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=30)
    release_name = models.CharField(max_length=30)
    genre = models.CharField(max_length=30)
    release_date = models.DateField()
